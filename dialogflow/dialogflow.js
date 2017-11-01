const quoteModule = require('../quotes/quotes.js')
var response = {}

module.exports = {
  // ## dialogflow intents ##
  getResponse: function(intentName, parameters, contexts) {
    return new Promise((resolve, reject) => {
      console.log("Triggerd intent: " + intentName + "with params: " + parameters + ".")

      switch (intentName) {
        case 'joke':
          resolve(this.getRandomJoke())
          break;

        case 'chuck-norris':
          resolve(this.getRandomChuckNorris())
          break;

        case 'quote':
          resolve(this.getForismaticQuote())
          break;

        case 'startup':
          resolve(this.getStartupIdea())
          break;

        case 'programming':
          resolve(this.getProgrammingQuote())
          break;

        case 'trump-quote':
          resolve(this.getRandomTrumpQuote())
          break;

        case 'yes-no':
          resolve(this.getYesOrNo())
          break;

        case 'number-trivia':
          resolve(this.getNumberTrivia())
          break;

        case 'year-trivia':
          resolve(this.getYearTrivia())
          break;

        case 'cat-fact':
          resolve(this.getCatFact())
          break;

        case 'dog-fact':
          resolve(this.getDogFact())
          break;

        default:
          console.log("Something went wrong. The default switch case was triggered. This means there was a intent triggered from api.ai that is not yet implemented in the webhook You triggered the intent: " + intentName + ", with the parameters: " + parameters)
          reject("Something went wrong. Sorry about that.")
          break;
      }
    })
  },

  // ### Build the responses (messages, pictures and quick replies) for the intents ### 

  /*
  Fetch a quote from an API.
  */
  getRandomJoke: function() {
    return this.getSimpleResponse(quoteModule.getRandomJoke())
  },

  getRandomChuckNorris: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getRandomChuckNorris().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getForismaticQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getForismaticQuote().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getStartupIdea: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getStartupIdea().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getProgrammingQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getProgrammingQuote().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getRandomTrumpQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getRandomTrumpQuote().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getNumberTrivia: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getNumberTrivia().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getYearTrivia: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getYearTrivia().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getCatFact: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getCatFact().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getDogFact: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getDogFact().then(
        (text) => {
          resolve(this.getSimpleResponse(text))
        }
      )
    })
  },

  getYesOrNo: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getYesOrNo().then(
        (resultObject) => {
          response.speech = resultObject.text;
          response.displayText = resultObject.text;
          response.messages = [this.getResponseMessageObject(resultObject.text), this.getImageObject(resultObject.imageUrl)]
          resolve(response)
        }
      )
    })
  },

  // ### construct the reponse objects for dialogflow ###

  getSimpleResponse: function(text) {
    return {
      "speech": text,
      "displayText": text,
      "messages": [this.getResponseMessageObject(text)]
    }
  },

  getResponseMessageObject: function(messageText) { // may be it would be better to call this a more specific name: like getResponseMessageObjectObject - because what we are doing here is creating an object!
    return {
      "type": 0,
      "speech": messageText
    }
  },

  getQuickRepliesObject: function(title, replies) {
    return {
      "type": 2,
      "title": title,
      "replies": replies
    }
  },

  getImageObject: function(imageUrl) {
    return {
      "type": 3,
      "imageUrl": imageUrl
    }
  },

  getContextOutObject: function(name, paremeters, lifespan) {
    return {
      "name": name,
      "parameters": paremeters,
      "lifespan": lifespan
    }
  },
}
