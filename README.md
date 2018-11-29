# liri_bot

Liri_Bot is a command line app built with Node.js and various API's to submit, accept responses and output formatted data from various sources based on dynamic user input.

**watch video demonstration here**
https://drive.google.com/file/d/12YiPiNokyITWGSsjXdV68kDXjsz5oqSi/preview

**Features**

* command line API requests with output formatting
* missing request data default operations
* read from external .txt file for operational data

**Avaliable Commands**

* **node liri.js**
  * Lists Avaliable Commands
  
* **node liri.js concert-this [artist/band name here]**
  * command [concert-this] followed by a string submission requests upcoming concert data from 'BandsInTown' API for upcoming concert listings. 
  * Defaults to "John Legend" in no request made following command.
  * *multiple word queries require parentheses ie. "text here"*
  
* **node liri.js spotify-this-song [song name here]**
  * command [spotify-this-song] followed by a string submission requests song and artist data for the first result only from Spotify's API.
  * Defaults to "The Sign by Ace of Base" in no request made following command.
  * *multiple word queries require parentheses ie. "text here"*
  
* **node liri.js movie-this [movie name here]**
  * command [movie-this] followed by a string submission requests movie data from OMDB API.
  * Defaults to "Mr. Nobody" in no request made following command.
  * *multiple word queries require parentheses ie. "text here"*
  
* **node liri.js [do-what-it-says]**
  * Does not take any arguments, reads the argument and data submission from a .txt file "random.txt'
  * initial state set as [spotify-this-song, "I Want It That Way"]
