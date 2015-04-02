/**
 * Created by ben on 4/2/15.
 */
/* Load the HTTP library */
(function () {

    var http =  require("http"),
        express = require('express3'),
        mongoose = require('mongoose'),
        app = express();

    app.use(express.static(__dirname))
    app.use(express.urlencoded());

    mongoose.connect('mongodb://localhost/sptest')

    var SongSchema = mongoose.Schema({
        "song" : String,
        "artist" : String,
        "album" : String,
        "date" : String
    });

    var Song = mongoose.model('song', SongSchema);

    http.createServer(app).listen(3000);

    app.get("/getSong", function(request, response) {
       Song.find(request.query, function(error, song) {
           if(error) {
               console.log(error);
           } else {
               response.json(song);
           }
       });
    });

    app.post("/putSong", function(request, response) {
        var newSong = new Song(request.body);
        newSong.save(function(error, data) {
            if (error) console.log(error);
        });
    });

    app.post("/removeSong", function(request, response) {
        var oldSong = new Song(request.body);
        oldSong.remove(function(error, data) {
            if (error) console.log(error);
        });
    });

    console.log("Server listening on port 3000.");




/*    /!* Create an HTTP server to handle responses *!/
    http.createServer(function(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }).listen(3000);*/

}());

