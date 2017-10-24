const request = require('request');

const zodiacSignMap = new Map();
zodiacSignMap.set('Capricorn', 'Capricorn ("The Mountain Sea-goat")\nDates: December 22 – January 19 \nThey are really cool animals! They can climb like badasses and are very cheeky');
zodiacSignMap.set('Aquarius', 'Aquarius\nDates: January 20 – February 18\nAlternative name: "The Waterbearer"\nAs the name suggests, they like water a lot. Their best abilities lie in watering plants as they have so much. ');
zodiacSignMap.set('Pisces', 'Pisces\nDates: February 19 – March 20\nAlternative name: "The Fish"\nPisces are fishes. Living in the water is a cool thing.');
zodiacSignMap.set('Aries', 'Aries ("The Ram")\nDates: March 21 – April 19\nAries is symbolized by the ram, which fits very well as this sign is strong, impulsive and has a hot temper. They attack any goal without fear and do not stop until they reach their goal. They get mad fast when they cannot reach a goal, but on the other hand do not hold a grudge for long.\nIts planet is the planet Mars, the planet of fire.');
zodiacSignMap.set('Taurus', 'Taurus\nDates: April 20 – May 20\nAlternative name: "The Bull"\nThese animals are very big and strong. Altough most of the time they are very peaceful and just graze.');
zodiacSignMap.set('Gemini', 'Gemini\nDates: May 21 – June 20\nAlternative name: "The Twins"\nGemini is cool, because it means sth. like siblings and to have a sibling is a wonderful thing. Even if you may be not have a sibling, with your star sign you do! :)');
zodiacSignMap.set('Cancer', 'Cancer\nDates: June 21 – July 22\nAlternative name: "The Crab"\nCancer have two scissors on their hands, which is pretty badass!');
zodiacSignMap.set('Leo', 'Leo\nDates: July 23 – August 22\nAlternative name: "The Lion"\nLions are so cool! They are like the kings of animal kingdom!');
zodiacSignMap.set('Virgo', 'Virgo\nDates: August 23 – September 22\nAlternative name: "The Maiden"\nVirgos are very intelligent! And beautiful! Your are great!');
zodiacSignMap.set('Libra', 'Libra\nDates: September 23 – October 22\nAlternative name: "The Scales"\nLibra means sth. like a scale. So they are very harmonious.');
zodiacSignMap.set('Scorpio', 'Scorpio\nDates: October 23 – November 21\nAlternative name: "The Scorpion"\nScorpions are so cool! They have a tail with a sting and two scissor hands!!! Wow! ...');
zodiacSignMap.set('Sagittarius', 'Sagittarius\nDates: November 22 – December 21\nAlternative name: "The Archer"\nSagittarius is like bow and arrow. So they know whre to aim.');
zodiacSignMap.set('General', 'General information from Wikipedia:\nWhile Western astrology is essentially a product of Greco-Roman culture, some of its more basic concepts originated in Babylonia. Isolated references to celestial "signs" in Sumerian sources are insufficient to speak of a Sumerian zodiac. Specifically, the division of the ecliptic in twelve equal sectors is a Babylonian conceptual construction.\n\nBy the 4th century BC, Babylonian astronomy and its system of celestial omens had an influence on the culture of ancient Greece, as did the astrology of ancient Egypt by late 2nd century BC. This resulted, unlike the Mesopotamian tradition, in a strong focus on the birth chart of the individual and in the creation of horoscopic astrology, employing the use of the Ascendant (the rising degree of the ecliptic, at the time of birth), and of the twelve houses. Association of the astrological signs with Empedocles four classical elements was another important development in the characterization of the twelve signs.\nThe body of astrological knowledge by the 2nd century AD is described in Ptolemys Tetrabiblos, a work that was responsible for astrologys successful spread across Europe and the Middle East, and remained a reference for almost seventeen centuries as later traditions made few substantial changes to its core teachings.\nSource: https://en.wikipedia.org/wiki/Astrological_sign');

const zodiacSignPictureUrlMap = new Map();
// toDO: use only really free pictures from wikipedia to be safe!
zodiacSignPictureUrlMap.set('Capricorn', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Zoo-Capricorn-Mountain-Goat-2389416.jpg');
// https://cdn.pixabay.com/photo/2017/07/26/18/06/capricorn-2542608_960_720.png
zodiacSignPictureUrlMap.set('Aquarius', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Poseidon-Zodiac-Sign-Aquarius-Neptune-Composing-1865691.jpg');
// https://cdn.pixabay.com/photo/2017/05/08/23/51/aquarius-2296922_960_720.png
zodiacSignPictureUrlMap.set('Pisces', 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pisces_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040147.jpg');
// https://cdn.pixabay.com/photo/2017/05/10/16/18/fish-2301218_960_720.png
//zodiacSignPictureUrlMap.set('aries', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Aries2.jpg');
zodiacSignPictureUrlMap.set('Aries', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Horoscope-Aries-Icon-Images-Astrology-Zodiac-639126.jpg');
//https://cdn.pixabay.com/photo/2017/05/09/00/08/ram-2296942_960_720.png
zodiacSignPictureUrlMap.set('Taurus', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Bos-Primigenius-Taurus-Beef-Cow-Domestic-Cattle-56014.jpg');
// https://cdn.pixabay.com/photo/2017/07/06/17/56/bull-2478801_960_720.png
zodiacSignPictureUrlMap.set('Gemini', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gemini_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040144.jpg');
// https://cdn.pixabay.com/photo/2017/05/09/15/45/gemini-2298596_960_720.png
zodiacSignPictureUrlMap.set('Cancer', 'https://cdn.pixabay.com/photo/2015/02/22/09/39/horoscope-644864_960_720.jpg');
//https://cdn.pixabay.com/photo/2017/06/03/00/23/scorpio-2367640_960_720.png
zodiacSignPictureUrlMap.set('Leo', 'https://upload.wikimedia.org/wikipedia/commons/4/47/Lion_%28Panthera_leo%29_eye_close-up.jpg');
//https://cdn.pixabay.com/photo/2017/05/07/17/40/lion-2293073_960_720.png
zodiacSignPictureUrlMap.set('Virgo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg/1200px-Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg');
// https://cdn.pixabay.com/photo/2017/05/05/22/07/miss-2288356_960_720.png
zodiacSignPictureUrlMap.set('Libra', 'https://upload.wikimedia.org/wikipedia/commons/3/35/LibraCC.jpg');
// https://cdn.pixabay.com/photo/2017/05/10/17/19/libra-2301362_960_720.png
zodiacSignPictureUrlMap.set('Scorpio', 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Scorpio-bonatti.png');
// https://cdn.pixabay.com/photo/2017/06/03/00/23/scorpio-2367640_960_720.png
// https://upload.wikimedia.org/wikipedia/commons/c/cf/Sidney_Hall_-_Urania%27s_Mirror_-_Scorpio.jpg
zodiacSignPictureUrlMap.set('Sagittarius', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Milky_Way_and_Sagittarius_%28with_note%29.JPG');
// https://cdn.pixabay.com/photo/2017/05/05/21/50/sagittarius-2288323_960_720.png

const chineseZodiacMap = new Map();
chineseZodiacMap.set(0, 'Rat');
chineseZodiacMap.set(1, 'Ox');
chineseZodiacMap.set(2, 'Tiger');
chineseZodiacMap.set(3, 'Rabbit');
chineseZodiacMap.set(4, 'Dragon');
chineseZodiacMap.set(5, 'Snake');
chineseZodiacMap.set(6, 'Horse');
chineseZodiacMap.set(7, 'Goat');
chineseZodiacMap.set(8, 'Monkey');
chineseZodiacMap.set(9, 'Rooster');
chineseZodiacMap.set(10, 'Dog');
chineseZodiacMap.set(11, 'Pig');

const chineseZodiacPicturesUrlMap = new Map();
chineseZodiacPicturesUrlMap.set('Rat', 'https://cdn.pixabay.com/photo/2016/03/05/18/54/animal-1238228_960_720.jpg');
chineseZodiacPicturesUrlMap.set('Ox', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Euceratherium_BW.jpg');
chineseZodiacPicturesUrlMap.set('Tiger', 'https://cdn.pixabay.com/photo/2014/10/11/00/21/tiger-484097_960_720.jpg');
// https://upload.wikimedia.org/wikipedia/commons/6/62/Panthera_tigris_sumatran_subspecies.jpg
chineseZodiacPicturesUrlMap.set('Rabbit', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Grass-Cute-Rabbit-Hare-Lawn-Animal-Adorable-1903016.jpg');
chineseZodiacPicturesUrlMap.set('Dragon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bhutanese_dragon_%28%27druk%27%29.jpg/320px-Bhutanese_dragon_%28%27druk%27%29.jpg');
chineseZodiacPicturesUrlMap.set('Snake', 'https://cdn.pixabay.com/photo/2016/03/28/22/08/cobra-1287036_960_720.png');
chineseZodiacPicturesUrlMap.set('Horse', 'https://cdn.pixabay.com/photo/2017/02/13/20/22/horse-2063673_960_720.jpg');
chineseZodiacPicturesUrlMap.set('Goat', 'https://static.pexels.com/photos/459127/pexels-photo-459127.jpeg');
chineseZodiacPicturesUrlMap.set('Monkey', 'https://images.pexels.com/photos/40653/japanmakake-monkey-makake-animal-40653.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb');
chineseZodiacPicturesUrlMap.set('Rooster', 'https://cdn.pixabay.com/photo/2017/05/05/20/40/chicken-head-2288234_960_720.jpg');
chineseZodiacPicturesUrlMap.set('Dog', 'https://images.pexels.com/photos/8521/animal-dog-pet-eyes.jpg?w=1260&h=750&auto=compress&cs=tinysrgb');
chineseZodiacPicturesUrlMap.set('Pig', 'https://cdn.pixabay.com/photo/2016/07/14/15/36/pig-1516956_960_720.jpg');

module.exports = {

  /* returns the zodiac sign according to day and month */
  getZodiacSign: function(parameterDate) {
    let date = new Date(parameterDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    const last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
    let zodiacSign = (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
    return zodiacSign;
  },

  /* Returns the image url for a zodiac sign */
  getZodiacSignPictureUrl: function(zodiacSign) {
    // console.log("Getting zodiacSign picture for: ", zodiacSign);
    let zodiacPicture = zodiacSignPictureUrlMap.get(zodiacSign);
    return zodiacPicture;
  },

  /* Returns the info for a zodiac sign */
  getZodiacSignInfo: function(zodiacSign) {
    // console.log("Getting zodiacSign Info for: ", zodiacSign);
    let zodiacInfo = zodiacSignMap.get(zodiacSign);
    return zodiacInfo;
  },

  /* Calculate the chinese zodiac sign, which is dependent on the year */
  getChineseZodiacSign: function(year) {
    let chineseZodiacSign = ''
    if (year < 120) { // calculate the birthday if user gives his age and not a year
      let currentYear = new Date().getFullYear();
      let birthdayYear = currentYear - year;
      chineseZodiacSign = chineseZodiacMap.get((birthdayYear - 4) % 12);
    }
    else {
      chineseZodiacSign = chineseZodiacMap.get((year - 4) % 12);
    }
    return chineseZodiacSign;
  },

  /* Returns the url of the picture for a chinese zodiac sign */
  // toDo: get the zodiac sign from the zodiac sign we already have and don`t calculate it again here!
  getChineseZodiacSignPictureUrl: function(year) {
    let chineseZodiacSign = this.getChineseZodiacSign(year);
    // console.log("Getting chinese zodiacSign picture for: ", chineseZodiacSign);
    let chineseZodiacPicture = chineseZodiacPicturesUrlMap.get(chineseZodiacSign);
    return chineseZodiacPicture;
  },

  /* Fetches the horoscope from an API */
  getHoroscope: function(zodiacSign) {
    return new Promise((resolve, reject) => {
      console.log("Requesting horoscope for zodiac sign: ", zodiacSign);
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
