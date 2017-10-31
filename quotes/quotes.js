const request = require('request');

module.exports = {
  
  /*
  quote APIs
  
  http://forismatic.com/en
  Here we collect the most inspiring expressions of mankind.
  https://theysaidso.com/api/
  TheySaidSo Famous Quotes API
  https://www.forbes.com/forbesapi/thought/uri.json?enrich=true&query=1&relatedlimit=1
  https://en.wikiquote.org/w/api.php
  http://quotes.stormconsultancy.co.uk/api
  A hand picked selection of quotes from the field of computer science.
  https://whatdoestrumpthink.com/api-docs/index.html#introduction
  https://quotesondesign.com/api-v4-0/
  http://www.icndb.com/api/
  CHuck Norris Jokes
  https://www.programmableweb.com/api/chuck-norris-facts
  Chuck Norris Facts API
  https://talaikis.com/random_quotes_api/
  Random quotes API 72,000+ at the moment
  
  
  
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
  
  getRandomChuckNorris: () => {
      return new Promise((resolve, reject) => {
      console.log("Requesting quote for api: ... ");
      let requestUrl = 'https://api.chucknorris.io/jokes/random'
      request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let parsedBody = JSON.parse(body);
          // console.log(body + '/n' + requestUrl);
          console.log("Chuck Norris Fact from getRandomChuckNorris requested successfully.")
          let horoscope = "This is a random chuck norris fact: \n" + parsedBody.value;
          resolve(horoscope);
        }
        else {
          reject("The API request to " + requestUrl + " failed: " + error);
        }
      })
    })
  },
  
  
  
}
