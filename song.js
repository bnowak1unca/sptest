/**
 * Created by ben on 4/2/15.
 */
(function() {
    var app = angular.module('sptest', []);

    app.controller('SongController', ['$scope', function($scope) {
        $scope.song = $scope.artist = $scope.almum = $scope.date = '';
        $.getJSON('getSong', function(result) {
            $scope.songs = result;
        });

        $scope.add = function() {
            var newSong = {
                "song" : $scope.song,
                "artist" : $scope.artist,
                "album" : $scope.album,
                "date" : $scope.date
            };
            $scope.songs.push(newSong);
            $.post('putSong', newSong);
            $scope.song = $scope.artist = $scope.album = $scope.date = '';
        };

        $scope.remove = function(song) {
            $scope.songs.splice($scope.songs.indexOf(song), 1);
            $.post('removeSong', song);
        };
    }]);
}());