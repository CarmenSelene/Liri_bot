require("dotenv").config();

var axios = require("axios");

var Spotify = require("node-spotify-api");

const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song") {

        var getSong = process.argv[3];

        if (getSong === undefined) {
            getSong = "the sign ace of base";
        }

    spotify.search({ type: 'track', query: getSong, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var eachResult = data.tracks.items[0];
            var spotifySongName = eachResult.name;
            var spotifyBandName = eachResult.artists[0].name;
            var spotifyAlbumName = eachResult.album.name;
            var spotifyPreviewUrl = eachResult.preview_url;
            var spotifyLink = data.tracks.href;

            console.log('Song Name: ' + spotifySongName);
            console.log('Band Name: ' + spotifyBandName);
            console.log('Album Name: ' + spotifyAlbumName);
            console.log('Preview URL: ' + spotifyPreviewUrl);
            console.log('Link to Song: ' + spotifyLink);
        }

    });

} else if (process.argv[2] === "movie-this") {
    console.log('this is a movie');
} else if (process.argv[2] === "do-what-it-says") {
    console.log('this is a custom command');
} else if (process.argv[2] === "concert-this") {
    console.log('concert listing');
} else {
    console.log('please enter valid command [movie-this] [do-what-it-says] [concert-this] [spotify-this-song]');
};


// axios
//     .get("https://en.wikipedia.org/wiki/" + testSearch)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         if (error.response) {
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//         } else if (error.request) {
//             console.log(error.request);
//         } else {
//             console.log("Error", error.message);
//         }
//         console.log(error.config);
//     });
