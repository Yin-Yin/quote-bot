    const zodiacSignMap = new Map();
    zodiacSignMap.set('Capricorn', 'Capricorn\nDates: December 22 – January 19 \nThey are really cool animals! They can climb like badasses and are very cheeky');
    zodiacSignMap.set('Aquarius', 'Aquarius\nDates: January 20 – February 18\nAs the name suggests, they like water a lot. Their best abilities lie in watering plants as they have so much. ');
    zodiacSignMap.set('Pisces', 'Pisces\nDates: February 19 – March 20\nPisces are fishes. Living in the water is a cool thing.');
    zodiacSignMap.set('Aries', 'Aries\nDates: March 21 – April 19\nAries are animals that have a very strong will, as they have two horns to ram everyone. Harharhar.');
    zodiacSignMap.set('Taurus', 'Taurus\nDates: April 20 – May 20\nThese animals are very big and strong. Altough most of the time they are very peaceful and just graze.');
    zodiacSignMap.set('Gemini', 'Gemini\nDates: May 21 – June 20\nGemini is cool, because it means sth. like siblings and to have a sibling is a wonderful thing. Even if you may be not have a sibling, with your star sign you do! :)');
    zodiacSignMap.set('Cancer', 'Cancer\nDates: June 21 – July 22\nCancer have two scissors on their hands, which is pretty badass!');
    zodiacSignMap.set('Leo', 'Leo\nDates: July 23 – August 22\nLions are so cool! They are like the kings of animal kingdom!');
    zodiacSignMap.set('Virgo', 'Virgo\nDates: August 23 – September 22\nVirgos are very intelligent! And beautiful! Your are great!');
    zodiacSignMap.set('Libra', 'Libra\nDates: September 23 – October 22\nLibra means sth. like a scale. So they are very harmonious.');
    zodiacSignMap.set('Scorpio', 'Scorpio\nDates: October 23 – November 21\nScorpions are so cool! They have a tail with a sting and two scissor hands!!! Wow! ...');
    zodiacSignMap.set('Sagittarius', 'Sagittarius\nDates: November 22 – December 21\nSagittarius is like bow and arrow. So they know whre to aim.');


module.exports = {
    // ## zodiac sign part ##
    zodiacSignMap: zodiacSignMap,
        
    getResponse: function (parameters,intentName) {
      switch (intentName) {
        
        case 'zodiacsign.check':
          if (parameters.date === '') {
            return "The date is not correct."
          }
          let parameterDate = new Date(parameters.date);
          console.log("parameterDate: ", parameterDate);
          return "Your zodiac sign is " + this.getZodiacSign(parameterDate); 
          
        case 'zodiacsign.info':
          return this.getZodiacSignInfo(parameters.zodiacsign);
          
        default:
          return "Something went wrong. Sorry about that."
          // for debugging: return "Something went wrong. You triggered the intent: " + intentName + ", with the parameters: " + parameters;
      }
    },
    
    getZodiacSign: function(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
    
      // returns the zodiac sign according to day and month 
      var zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
      var last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
      return (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
    },
    
    getZodiacSignInfo: function(zodiacSign) {
      return zodiacSignMap.get(zodiacSign);
    }
}
