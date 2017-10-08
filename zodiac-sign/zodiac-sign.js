var request = require('request');

const zodiacSignMap = new Map();
zodiacSignMap.set('capricorn', 'Capricorn\nDates: December 22 – January 19 \nThey are really cool animals! They can climb like badasses and are very cheeky');
zodiacSignMap.set('aquarius', 'Aquarius\nDates: January 20 – February 18\nAs the name suggests, they like water a lot. Their best abilities lie in watering plants as they have so much. ');
zodiacSignMap.set('pisces', 'Pisces\nDates: February 19 – March 20\nPisces are fishes. Living in the water is a cool thing.');
zodiacSignMap.set('aries', 'Aries\nDates: March 21 – April 19\nAries are animals that have a very strong will, as they have two horns to ram everyone. Harharhar.');
zodiacSignMap.set('taurus', 'Taurus\nDates: April 20 – May 20\nThese animals are very big and strong. Altough most of the time they are very peaceful and just graze.');
zodiacSignMap.set('gemini', 'Gemini\nDates: May 21 – June 20\nGemini is cool, because it means sth. like siblings and to have a sibling is a wonderful thing. Even if you may be not have a sibling, with your star sign you do! :)');
zodiacSignMap.set('cancer', 'Cancer\nDates: June 21 – July 22\nCancer have two scissors on their hands, which is pretty badass!');
zodiacSignMap.set('leo', 'Leo\nDates: July 23 – August 22\nLions are so cool! They are like the kings of animal kingdom!');
zodiacSignMap.set('virgo', 'Virgo\nDates: August 23 – September 22\nVirgos are very intelligent! And beautiful! Your are great!');
zodiacSignMap.set('libra', 'Libra\nDates: September 23 – October 22\nLibra means sth. like a scale. So they are very harmonious.');
zodiacSignMap.set('scorpio', 'Scorpio\nDates: October 23 – November 21\nScorpions are so cool! They have a tail with a sting and two scissor hands!!! Wow! ...');
zodiacSignMap.set('sagittarius', 'Sagittarius\nDates: November 22 – December 21\nSagittarius is like bow and arrow. So they know whre to aim.');

const chineseZodiacMap = new Map();
chineseZodiacMap.set(0,'Rat');
chineseZodiacMap.set(1,'Ox');
chineseZodiacMap.set(2,'Tiger');
chineseZodiacMap.set(3,'Rabbit');
chineseZodiacMap.set(4,'Dragon');
chineseZodiacMap.set(5,'Snake');
chineseZodiacMap.set(6,'Horse');
chineseZodiacMap.set(7,'Goat');
chineseZodiacMap.set(8,'Monkey');
chineseZodiacMap.set(9,'Rooster');
chineseZodiacMap.set(10,'Dog');
chineseZodiacMap.set(11,'Pig');


// toDO: put this code in its own module
module.exports = {
    // ## API.ai intents ##
    getResponse: function (parameters,intentName) {
    return new Promise((resolve, reject) => {
        
      switch (intentName) {
        
        // ## zodiac sign ##
        case 'zodiacsign.check':
          console.log("Triggerd intent zodiacSign.check with params: ", parameters.date);
          if (parameters.date === '') {
            reject("The date is not correct.")
          }
          let parameterDate = new Date(parameters.date);
          let currentYear = new Date().getFullYear(); // I uzse this in another place as well => declare on top for whole module
          let dateYear = parameterDate.getFullYear();
          if (dateYear < currentYear) {
          console.log("Year is different: ", dateYear)
          console.log("CHinese Zodiac", this.getChineseZodiacSign(dateYear))
          } else {
            console.log("The date is from this year; ", dateYear);
          }
          // toDO: the output of the intent cannot work, because the result comes from the backend and not from api ai itself
          // I could use context.out here and pass the output context parameters forectly from the backend. read it online, need to conrom
          resolve(this.getZodiacSign(parameterDate))
          
        case 'zodiacsign.info':
          console.log("Triggerd intent zodiacSign.info with params: ", parameters.zodiacsign);
          resolve(this.getZodiacSignInfo(parameters.zodiacsign))
          
        case 'zodiacsign.info.context':
          console.log("Triggerd intent zodiacSign.info.context with params: ", parameters.zodiacsign);
          resolve(this.getZodiacSignInfo(parameters.zodiacsign))
                    
        case 'zodiacsign.year':
          console.log("Triggerd intent zodiacSign.year with params: ", parameters.age.amount);
          resolve(this.getChineseZodiacSign(parameters.age.amount))
          
        case 'zodiacsign.horoscope':
          console.log("Triggerd intent zodiacSign.horoscope with params: ", parameters.zodiacsign);
          this.getHoroscope(parameters.zodiacsign).
          then((horoscope) => { 
              console.log("Resolving Promise now")
              resolve(horoscope) })
          .catch((err) => {resolve("An error occured while fetching your horoscope: " + err)});
          
        case 'zodiacsign.horoscope.context':
          console.log("Triggerd intent zodiacSign.horoscope.context with params: ", parameters.zodiacsign);
          this.getHoroscope(parameters.zodiacsign).
          then((horoscope) => { 
              console.log("Resolving Promise now")
              resolve(horoscope) })
          .catch((err) => {resolve("An error occured while fetching your horoscope: " + err)});
          
        default:
          return "Something went wrong. Sorry about that."
          // for debugging: return "Something went wrong. You triggered the intent: " + intentName + ", with the parameters: " + parameters;
      }
    })
    },
    
    // toDO: add debugging, wether with console.logs or with a loghinh tool. THen add logging for the input and output to make sure I can debug errors later
    // toDo: make the documentation better
    // toDO: take apart the code into logical modules
    // toDO: add a bug report intent
    // to do: one functionality per one function!! Take apart the part where the message is constructed and the logic about the star sign
    getZodiacSign: function(date) {
        // returns the zodiac sign according to day and month 
        let month = date.getMonth() + 1;
        let day = date.getDate();
        const zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        const last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
        let zodiacSign = (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
        let response = {}
        response.speech = "Your zodiac sign is " + zodiacSign 
        response.displayText = "Your zodiac sign is " + zodiacSign
        response.messages = [
        {
        "type": 0,
        "speech": "Your zodiac sign is " + zodiacSign
        },
        /*
        {
        "type": 3,
        "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
        }
        ,
        */
        {
        "type": 2,
        "title": "Do you want to know more?",
        "replies": ["Horoscope", "Info"]
        }
        ]
        console.log("ZodiacSign parameter is: ", zodiacSign);
        //zodiacSign.toLowerCase()
        response.contextOut = [{"name":"zodiac-sign", "lifespan":20, "parameters":{"zodiacsign":"Aries"}}];
        
        response.contexts = [{"name":"zodiac-sign", "lifespan":20, "parameters":{"zodiacsign":"aries"}}];
        console.log("response: ", response);
        return response;
    },
    
    getZodiacSignInfo: function(zodiacSign) {
        console.log("zodiacSign.Info", zodiacSign);
        let zodiacInfo = zodiacSignMap.get(zodiacSign);
        
        let response = {}
        response.speech = zodiacInfo;
        response.displayText = zodiacInfo;
        response.messages = [
        {
        "type": 0,
        "speech": zodiacInfo
        },
        /*
        {
        "type": 3,
        "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
        }
        ,
        */
        {
        "type": 2,
        "title": "You can get the horoscope for this zodiac sign.",
        "replies": ["Horoscope"]
        }
        ]
        return response;
    
        
    },
    
    getChineseZodiacSign: function (year) {
      let chineseZodiacSign = ''
      if(year < 120) { // calculate the birthday if user gives his age and not a year
        let currentYear = new Date().getFullYear();
        let birthdayYear = currentYear - year;
        chineseZodiacSign = chineseZodiacMap.get((birthdayYear - 4) % 12) + ".";
      } else {
        chineseZodiacSign = chineseZodiacMap.get((year - 4) % 12) + ".";
      }
                
        let response = {}
        response.speech = "Your chinese zodiac sign is " + chineseZodiacSign;
        response.displayText = "Your chinese zodiac sign is " + chineseZodiacSign;;
        response.messages = [
        {
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign
        },
        /*
        {
        "type": 3,
        "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
        }
        ,
        
        {
        "type": 2,
        "title": "You can get the horoscope for this zodiac sign.",
        "replies": ["Horoscope"]
        }
        */
        ]
        return response;
    },
    getHoroscope: function(zodiacSign) {
        return new Promise((resolve, reject) => {
            console.log("Requesting horoscope for zodiac sign: ", zodiacSign);
            let requestUrl =  'http://sandipbgt.com/theastrologer/api/horoscope/' + zodiacSign +'/today'
            request(requestUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let parsedBody = JSON.parse(body);
                    console.log(body + '/n' + requestUrl);
                    let horoscope = "The horoscope for " + zodiacSign + " for today is: \n" + parsedBody.horoscope;
                    let response = {}
                    response.speech = horoscope;
                    response.displayText = horoscope;
                    response.messages = [
                    {
                    "type": 0,
                    "speech": horoscope
                    },
                    /*
                    {
                    "type": 3,
                    "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
                    }
                    ,
                    {
                    "type": 2,
                    "title": "Do you want to know more?",
                    "replies": ["Info"]
                    }
                    */
                    ]
                    
                    resolve(response);
                 } else {
                     reject("There was an error retrieving your horoscope for " + zodiacSign + ".");
                 }
            })
        })
        
    }
}


/*

  
      switch (intentName) {
        
        case 'zodiacsign.check':
          if (parameters.date === '') {
            return "The date is not correct."
          }
          let parameterDate = new Date(parameters.date);
          return "Your zodiac sign is " + this.getZodiacSign(parameterDate); 
          
        case 'zodiacsign.info':
          return this.getZodiacSignInfo(parameters.zodiacsign);
                    
        case 'zodiacsign.year':
          return this.getChineseZodiacSign(parameters.age.amount);
          
        case 'zodiacsign.horoscope':
             console.log("horoscope");
          this.getHoroscope(parameters.zodiacsign).
          then((horoscope) => { 
              console.log("Resolving Promise now")
              return horoscope })
          .catch((err) => {return "An error occured while fetching your horoscope: " + err});
        
          
        case 'zodiacsign.check.horoscope':
            console.log("horoscope");
          this.getHoroscope(parameters.zodiacsign).
          then((horoscope) => { 
              console.log("Resolving Promise now")
              return horoscope })
          .catch((err) => {return "An error occured while fetching your horoscope: " + err});
          
        default:
          return "Something went wrong. Sorry about that."
          // for debugging: return "Something went wrong. You triggered the intent: " + intentName + ", with the parameters: " + parameters;
      
      
*/      