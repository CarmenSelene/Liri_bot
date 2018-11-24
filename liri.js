require("dotenv").config();

var axios = require("axios");

var Spotify = require("node-spotify-api");

const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);

var testSearch = "dogs";

if (process.argv[2] === "spotify-this-song") {
    var getSong = process.argv[3];

    spotify.search({ type: 'track', query: getSong, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
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
