require("dotenv").config();

var axios = require("axios");

var Spotify = require("node-spotify-api");

const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song") {
    var getSong = process.argv[3];

    spotify.search({ type: 'track', query: getSong, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        var spotifySongName = data.tracks.items[0].name;

        var spotifyBandName = data.tracks.items[0].album.artists[0].name;

        var spotifyLink = data.tracks.href.toString();

        var spotifyArtistsObj = data.tracks.items[0].album.artists;

        var spotifyArtists = Object.values(spotifyArtistsObj);

        console.log('Song Name: ' + spotifySongName);
        console.log('Band Name: ' + spotifyBandName);
        console.log('Link to Song: ' + spotifyLink);
        console.log('Artist(s): ' + Object.values(spotifyArtistsObj));
    });
};

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


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
