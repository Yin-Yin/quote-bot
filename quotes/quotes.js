const request = require('request');

module.exports = {

  /*
  quote APIs
  
  https://theysaidso.com/api/
  TheySaidSo Famous Quotes API
  https://www.forbes.com/forbesapi/thought/uri.json?enrich=true&query=1&relatedlimit=1
  https://en.wikiquote.org/w/api.php
  http://www.icndb.com/api/
  CHuck Norris Jokes
  https://www.programmableweb.com/api/chuck-norris-facts
  Chuck Norris Facts API
  https://talaikis.com/random_quotes_api/
  Random quotes API 72,000+ at the moment
  yo mama jokes
  http://api.yomomma.info/ 
  
  
  
  */

  /* Fetches a random joke from the webknox joke API */
  getWebKnoxRandomJoke: function() {
    return new Promise((resolve, reject) => {
      console.log("Requesting quote for api: ... ");
      let requestUrl = 'https://webknox-jokes.p.mashape.com/jokes/random'
      request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let parsedBody = JSON.parse(body);
          // console.log(body + '/n' + requestUrl);
          console.log("Joke from getWebKnoxRandomJoke requested successfully.")
          let horoscope = "This is a random joke from the category " + body.category + ": \n" + parsedBody.joke;
          resolve(horoscope);
        }
        else {
          reject("The API request to " + requestUrl + " failed: " + error);
        }
      })
    })
  },

  // API documentation: https://api.chucknorris.io/#!
  // alternative: http://www.icndb.com/api/
  getRandomChuckNorris: function(argument) {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://api.chucknorris.io/jokes/random'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let chukcNorrisFact = parsedBody.value;
        resolve(chukcNorrisFact)
      })
    })
  },

  // API documentation: http://forismatic.com/en/api/
  getForismaticQuote: function(argument) {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = '"' + parsedBody.quoteText + '" - ' + parsedBody.quoteAuthor;
        resolve(resultText)
      })
    })
  },

  // API documentation: http://quotes.stormconsultancy.co.uk/api
  getProgrammingQuote: function(argument) {
    return new Promise((resolve, reject) => {
      let requestUrl = 'http://quotes.stormconsultancy.co.uk/random.json'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = '"' + parsedBody.quote + '" - ' + parsedBody.author;
        resolve(resultText)
      })
    })
  },

  // API documentation: https://whatdoestrumpthink.com/api-docs/index.html#introduction
  getRandomTrumpQuote: function(argument) {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = '"' + parsedBody.message + '" - Donald Trump';
        resolve(resultText)
      })
    })
  },

  getStartupIdea: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'http://itsthisforthat.com/api.php?json'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = parsedBody.this + " for " + parsedBody.that;
        resolve(resultText)
      })
    })
  },

  // api documentation: https://yesno.wtf/#api
  getYesOrNo: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://yesno.wtf/api/'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultObject = {
          "text": parsedBody.answer,
          "imageUrl": parsedBody.image
        };
        resolve(resultObject)
      })
    })
  },


  // make the API calls
  fetchFromAPI: function(requestUrl) {
    return new Promise((resolve, reject) => {
      request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let parsedBody = JSON.parse(body);
          console.log("API request to " + requestUrl + " successfull.")
          resolve(parsedBody);
        }
        else {
          reject("The API request to " + requestUrl + " failed: " + error);
        }
      })
    })
  }


}
