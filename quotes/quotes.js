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

  /* Fetches a quote from an API */
  getQUote: function() {
    return new Promise((resolve, reject) => {
      console.log("Requesting quote for api: ... ");
      let requestUrl = 'http://sandipbgt.com/theastrologer/api/horoscope/' + zodiacSign.toLowerCase() + '/today'
      request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let parsedBody = JSON.parse(body);
          // console.log(body + '/n' + requestUrl);
          console.log("Horoscope for " + zodiacSign + " requested successfully.")
          let horoscope = "The horoscope for " + zodiacSign + " for today is: \n" + parsedBody.horoscope;
          resolve(horoscope);
        }
        else {
          reject("The API request for ther horoscope for " + zodiacSign + " failed: " + error);
        }
      })
    })
  }
}
