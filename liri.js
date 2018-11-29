require("dotenv").config();

var axios = require("axios");

var Spotify = require("node-spotify-api");

var fs = require("fs");

const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

// const BandsInTown = new BandsInTown(keys.BandsInTown);

// const OMDB = new OMDB(keys.OMDB);

var whatIsChoice;

var moment = require("moment");

if (process.argv[2] === "spotify-this-song") {
  spotifyApp();
} else if (process.argv[2] === "do-what-it-says") {
  txtApp();
} else if (process.argv[2] === "movie-this") {
  movieApp();
} else if (process.argv[2] === "concert-this") {
  concertApp();
} else {
  console.log(
    "Please enter valid command [movie-this] [do-what-it-says] [concert-this] [spotify-this-song]"
  );
}

function spotifyApp(x) {
  console.log("[Running spotifyApp();]");
  var getSong = process.argv[3];

  if (whatIsChoice != undefined) {
    getSong = whatIsChoice;
  }

  if (getSong === undefined && x === undefined) {
    console.log("[No Song Chosen - Submitting Default]");
    getSong = "the sign ace of base";
  } else if (getSong === undefined && x == true) {
    getSong = x;
  }

  spotify.search({ type: "track", query: getSong, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      var eachResult = data.tracks.items[0];
      var spotifySongName = eachResult.name;
      var spotifyBandName = eachResult.artists[0].name;
      var spotifyAlbumName = eachResult.album.name;
      var spotifyPreviewUrl = eachResult.preview_url;

      console.log("");
      console.log("*****");
      console.log("Song Name: " + spotifySongName);
      console.log("Band Name: " + spotifyBandName);
      console.log("Album Name: " + spotifyAlbumName);
      if (spotifyPreviewUrl === null) {
        console.log("Request Successfull - No Preview Url Sent");
      } else {
        console.log("Preview URL: " + spotifyPreviewUrl);
      }
      console.log("-----");
      console.log("");
    }
  });
}

function txtApp() {
  console.log("[Running txtApp();]");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var processChoice = dataArr[0].valueOf();
    whatIsChoice = dataArr[1].valueOf();

    if (processChoice == "spotify-this-song") {
      spotifyApp();
    }

    if (processChoice === "movie-this") {
      movieApp();
    }

    if (processChoice === "concert-this") {
      concertApp();
    }
  });
}

function movieApp() {
  console.log("[Running movieApp();]");
  var movieSearchTerm = process.argv[3];

  if (movieSearchTerm === undefined) {
    console.log("[No Movie Chosen - Submitting Default]");
    movieSearchTerm = "Mr. Nobody";
  }

  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        movieSearchTerm +
        "&y=&plot=short&apikey=" +
        keys.OMDB.id +
        ""
    )
    .then(function(response) {
      console.log("");
      console.log("*****");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Released);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country Produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot Synopsis: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("-----");
      console.log("");
    });
}

function concertApp() {
  console.log("[Running concertApp();]");
  var bandSearchTerm = process.argv[3];

  if (bandSearchTerm === undefined) {
    console.log('[No Artist Chosen - Submitting Default ("John Legend")]');
    bandSearchTerm = "John Legend";
  }

  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        bandSearchTerm +
        "/events?app_id=" +
        keys.BandsInTown.id +
        "&date=upcoming"
    )
    .then(function(response) {
      var i;
      for (i = 0; i < response.data.length - 1; i++) {
        var inputDate = response.data[i].datetime;
        var dateFormatted = moment(inputDate).format("MM DD YYYY");
        console.log("*****");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Event City: " + response.data[i].venue.city);
        console.log("Event Date: " + dateFormatted);
        console.log("-----");
      }
    });
}
