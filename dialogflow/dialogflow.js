const quoteModule = require('../quotes/quotes.js')
var response = {}

module.exports = {
  // ## dialogflow intents ##
  getResponse: function(intentName, parameters, contexts) {
    return new Promise((resolve, reject) => {
      console.log("Triggerd intent: " + intentName + "with params: " + parameters + ".")

      switch (intentName) {
        // ## quotes ##
        case 'joke':
          resolve(this.getRandomChuckNorris())
          break;

        case 'chuck-norris':
          resolve(this.getRandomChuckNorris())
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
  getRandomChuckNorris: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getWebKnoxRandomJoke().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },

  // ### construct the reponse objects for dialogflow ###

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
