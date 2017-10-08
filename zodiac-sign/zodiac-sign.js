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
chineseZodiacMap.set(0,'rat');
chineseZodiacMap.set(1,'ox');
chineseZodiacMap.set(2,'tiger');
chineseZodiacMap.set(3,'rabbit');
chineseZodiacMap.set(4,'dragon');
chineseZodiacMap.set(5,'snake');
chineseZodiacMap.set(6,'horse');
chineseZodiacMap.set(7,'goat');
chineseZodiacMap.set(8,'monkey');
chineseZodiacMap.set(9,'rooster');
chineseZodiacMap.set(10,'dog');
chineseZodiacMap.set(11,'pig');

module.exports = {
    // ## API.ai intents ##
    getResponse: function (parameters,intentName) {
    return new Promise((resolve, reject) => {
        
      switch (intentName) {
        
        case 'zodiacsign.check':
          if (parameters.date === '') {
            resolve("The date is not correct.")
          }
          let parameterDate = new Date(parameters.date);
          resolve("Your zodiac sign is " + this.getZodiacSign(parameterDate))
          
        case 'zodiacsign.info':
          resolve(this.getZodiacSignInfo(parameters.zodiacsign))
                    
        case 'zodiacsign.year':
          resolve(this.getChineseZodiacSign(parameters.age.amount))
          
        case 'zodiacsign.horoscope':
             console.log("horoscope");
          this.getHoroscope(parameters.zodiacsign).
          then((horoscope) => { 
              console.log("Resolving Promise now")
              resolve(horoscope) })
          .catch((err) => {resolve("An error occured while fetching your horoscope: " + err)});
        
          
        case 'zodiacsign.check.horoscope':
            console.log("horoscope");
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
    
    getZodiacSign: function(date) {
        // returns the zodiac sign according to day and month 
        let month = date.getMonth() + 1;
        let day = date.getDate();
        const zodiac = ['', 'capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn'];
        const last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
        return (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
    },
    
    getZodiacSignInfo: function(zodiacSign) {
        console.log("zodiacSign.Info", zodiacSign);
        return zodiacSignMap.get(zodiacSign);
    },
    
    getChineseZodiacSign: function (year) {
      if(year < 120) {
        let currentYear = new Date().getYear();
        let birthdayYear = currentYear - year;
        return "Your chinese zodiac sign is " + chineseZodiacMap.get((birthdayYear - 4) % 12) + ".";
      } 
        return "Your chinese zodiac sign is " + chineseZodiacMap.get((year - 4) % 12) + ".";
    },
    getHoroscope: function(zodiacSign) {
        
        return new Promise((resolve, reject) => {
            let requestUrl =  'http://sandipbgt.com/theastrologer/api/horoscope/' + zodiacSign +'/today'
            request(requestUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let parsedBody = JSON.parse(body);
                    console.log(body + '/n' + requestUrl);
                    resolve("The horoscope for " + zodiacSign + " for today is: \n" + parsedBody.horoscope);
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