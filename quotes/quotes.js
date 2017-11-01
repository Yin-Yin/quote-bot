const request = require('request');

const jokesMap = new Map();
jokesMap.set('1', 'Three guys stranded on a desert island find a magic lantern containing a genie, who grants them each one wish. The first guy wishes he was off the island and back home. The second guy wishes the same. The third guy says: ‘I’m lonely. I wish my friends were back here.’');
jokesMap.set('2', 'Here’s some advice: At a job interview, tell them you’re willing to give 110 percent. Unless the job is a statistician.');
jokesMap.set('3', 'After a talking sheepdog gets all the sheep in the pen, he reports back to the farmer: “All 40 accounted for.”\n“But I only have 36 sheep,” says the farmer.\n“I know,” says the sheepdog. “But I rounded them up.”');
jokesMap.set('4', 'Q: What did Al Gore play on his guitar?\n\nA: An Algorithm');
jokesMap.set('5', "-Have you heard of Murphy's Law\n-Yes, anything can go wrong will go wrong\n-What's about Cole's law?\n-No\n-It's a thin-slice cabbage dripped in mayonnaise and sour cream");
jokesMap.set('7', 'Dr Frankenstein entered a body building contest. Upon arrival he realised he misunderstood the objective.');
jokesMap.set('8', "People laughed at me when I said I wanted to be a comedian. Well, they're not laughing now.\n(Bob Monkhouse)");
jokesMap.set('9', 'My wife told me I need to quit playing Wonderwall on guitar.\nI said maybe...');
jokesMap.set('10', 'What is the difference between a hippo and a zippo?\nOne is really heavy, and the other is a little lighter.');
jokesMap.set('11', 'I stayed up all night wondering where the sun went. Then it dawned on me.');
jokesMap.set('12', 'I forgot how to throw a boomerang. Then it came back to me.');
jokesMap.set('13', "Why did the old man fall in the well?\nBecause he couldn't see that well.");
jokesMap.set('14', 'What do you call a dog that does magic tricks?\nA labracadabrador.');
jokesMap.set('15', 'I poured root beer in a square glass.\nNow I just have beer.');

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
  /*
  getWebKnoxRandomJoke: function() {
    return new Promise((resolve, reject) => {
      console.log("Requesting quote for api: ... ");
      let requestUrl = 'https://webknox-jokes.p.mashape.com/jokes/random'
      let requesObject = {
        
      }
      request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let parsedBody = JSON.parse(body);
          // console.log(body + '/n' + requestUrl);
          console.log("Joke from getWebKnoxRandomJoke requested successfully.")
          let resultText = "This is a random joke from the category " + body.category + ": \n" + parsedBody.joke;
          resolve(resultText);
        }
        else {
          console.log("The API request to " + requestUrl + " failed: " + error + " This might be because the free quota of this API has been exceeded. In this case a joke from the map will be catched.")
          let resultText = jokesMap.get(Math.floor(Math.random() * jokesMap.size) + 1); // get a random joke from the map
          resolve(resultText);
        }
      })
    })
  },
  */

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

  // website: http://itsthisforthat.com/
  getStartupIdea: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'http://itsthisforthat.com/api.php?json'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = parsedBody.this + " for " + parsedBody.that;
        resolve(resultText)
      })
    })
  },

  // api documentatioN: http://numbersapi.com/#random/trivia
  getNumberTrivia: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'http://numbersapi.com/random/trivia'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        resolve(parsedBody)
      })
    })
  },

  // api documentation: http://numbersapi.com/#random/trivia
  getYearTrivia: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'http://numbersapi.com/random/year'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        resolve(parsedBody)
      })
    })
  },

  // api documentation: https://catfact.ninja/
  getCatFact: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://catfact.ninja/fact'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = parsedBody.fact;
        resolve(resultText)
      })
    })
  },

  // api documentation: https://fact.birb.pw/
  getDogFact: function() {
    return new Promise((resolve, reject) => {
      let requestUrl = 'https://fact.birb.pw/api/v1/dog'
      this.fetchFromAPI(requestUrl).then((parsedBody) => {
        let resultText = parsedBody.fact;
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
