require("dotenv").config();

var axios = require("axios");

var Spotify = require("node-spotify-api");

var fs = require("fs");

const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song") {
    spotifyApp();
} else if (process.argv[2] === "do-what-it-says") {
    txtApp();
} else if (process.argv[2] === "movie-this") {
    movieApp();
} else if (process.argv[2] === "concert-this") {
    concertApp();
} else {
    console.log('Please enter valid command [movie-this] [do-what-it-says] [concert-this] [spotify-this-song]');
};

function spotifyApp(x) {
    console.log('[Song Found]');
    var getSong = process.argv[3];

    if (getSong === undefined && x === undefined) {
        getSong = "the sign ace of base";
    } else {
        getSong = x;
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

            console.log('Song Name: ' + spotifySongName);
            console.log('Band Name: ' + spotifyBandName);
            console.log('Album Name: ' + spotifyAlbumName);
            console.log('Preview URL: ' + spotifyPreviewUrl);
        }

    });

};

function txtApp() {
    console.log('[Command Recieved]');

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        // console.log("node liri.js " + dataArr);
        var processChoice = dataArr[0].valueOf();
        // console.log("Run Command: " + processChoice);
        var whatIsChoice = dataArr[1].valueOf();
        // console.log("Submitted Input: " + whatIsChoice);
        spotifyApp(whatIsChoice);

    });

};

function movieApp() {
    console.log('[Movie Found]');
    var movieSearchTerm = process.argv[3];

    if (movieSearchTerm === undefined) {
        movieSearchTerm = "Mr. Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + movieSearchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log("response.data: " + Object.keys(response.data));
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot Synopsis: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
};

function concertApp() {
// TBC
};
