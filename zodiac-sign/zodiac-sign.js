const request = require('request');

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

const zodiacSignPictureMap = new Map();
// toDO: use only really free pictures from wikipedia to be safe!
zodiacSignPictureMap.set('Capricorn', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Zoo-Capricorn-Mountain-Goat-2389416.jpg');
// https://cdn.pixabay.com/photo/2017/07/26/18/06/capricorn-2542608_960_720.png
zodiacSignPictureMap.set('Aquarius', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Poseidon-Zodiac-Sign-Aquarius-Neptune-Composing-1865691.jpg');
// https://cdn.pixabay.com/photo/2017/05/08/23/51/aquarius-2296922_960_720.png
zodiacSignPictureMap.set('Pisces', 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pisces_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040147.jpg');
// https://cdn.pixabay.com/photo/2017/05/10/16/18/fish-2301218_960_720.png
//zodiacSignPictureMap.set('aries', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Aries2.jpg');
zodiacSignPictureMap.set('Aries', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Horoscope-Aries-Icon-Images-Astrology-Zodiac-639126.jpg');
//https://cdn.pixabay.com/photo/2017/05/09/00/08/ram-2296942_960_720.png
zodiacSignPictureMap.set('Taurus', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Bos-Primigenius-Taurus-Beef-Cow-Domestic-Cattle-56014.jpg');
// https://cdn.pixabay.com/photo/2017/07/06/17/56/bull-2478801_960_720.png
zodiacSignPictureMap.set('Gemini', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gemini_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040144.jpg');
// https://cdn.pixabay.com/photo/2017/05/09/15/45/gemini-2298596_960_720.png
zodiacSignPictureMap.set('Cancer', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Sidney_Hall_-_Urania%27s_Mirror_-_Scorpio.jpg');
//https://cdn.pixabay.com/photo/2017/06/03/00/23/scorpio-2367640_960_720.png
zodiacSignPictureMap.set('Leo', 'https://upload.wikimedia.org/wikipedia/commons/4/47/Lion_%28Panthera_leo%29_eye_close-up.jpg');
//https://cdn.pixabay.com/photo/2017/05/07/17/40/lion-2293073_960_720.png
zodiacSignPictureMap.set('Virgo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg/1200px-Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg');
// https://cdn.pixabay.com/photo/2017/05/05/22/07/miss-2288356_960_720.png
zodiacSignPictureMap.set('Libra', 'https://upload.wikimedia.org/wikipedia/commons/3/35/LibraCC.jpg');
// https://cdn.pixabay.com/photo/2017/05/10/17/19/libra-2301362_960_720.png
zodiacSignPictureMap.set('Scorpio', 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Scorpio-bonatti.png');
// https://cdn.pixabay.com/photo/2017/06/03/00/23/scorpio-2367640_960_720.png
zodiacSignPictureMap.set('Sagittarius', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Milky_Way_and_Sagittarius_%28with_note%29.JPG');
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


const chineseZodiacPicturesMap = new Map();
chineseZodiacPicturesMap.set('Rat', '');
chineseZodiacPicturesMap.set('Ox', '');
chineseZodiacPicturesMap.set('Tiger', '');
chineseZodiacPicturesMap.set('Rabbit', '');
chineseZodiacPicturesMap.set('Dragon', '');
chineseZodiacPicturesMap.set('Snake', '');
chineseZodiacPicturesMap.set('Horse', '');
chineseZodiacPicturesMap.set('Goat', '');
chineseZodiacPicturesMap.set('Monkey', '');
chineseZodiacPicturesMap.set('Rooster', '');
chineseZodiacPicturesMap.set('Dog', '');
chineseZodiacPicturesMap.set('Pig', 'https://cdn.pixabay.com/photo/2016/07/14/15/36/pig-1516956_960_720.jpg');

// toDO: put this code in its own module
module.exports = {
  // toDO: add debugging, wether with console.logs or with a loghinh tool. THen add logging for the input and output to make sure I can debug errors later
  // toDo: make the documentation better
  // toDO: take apart the code into logical modules
  // toDO: add a bug report intent
  // to do: one functionality per one function!! Take apart the part where the message is constructed and the logic about the star sign

  getZodiacSign: function(parameterDate) {
    // returns the zodiac sign according to day and month
    let date = new Date(parameterDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    const last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
    let zodiacSign = (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
    return zodiacSign;
  },
  
  getZodiacSignPicture: function(zodiacSign) {
    console.log("Getting zodiacSign picture for: ", zodiacSign);
    let zodiacPicture = zodiacSignPictureMap.get(zodiacSign);
    return zodiacPicture;
  },

  getZodiacSignInfo: function(zodiacSign) {
    console.log("Getting zodiacSign Info for: ", zodiacSign);
    let zodiacInfo = zodiacSignMap.get(zodiacSign);
    return zodiacInfo;
  },

  // Calculate the chinese zodiac sign, which is dependent on the year
  getChineseZodiacSign: function(year) {
    let chineseZodiacSign = ''
    if (year < 120) { // calculate the birthday if user gives his age and not a year
      let currentYear = new Date().getFullYear();
      let birthdayYear = currentYear - year;
      chineseZodiacSign = chineseZodiacMap.get((birthdayYear - 4) % 12) + ".";
    }
    else {
      chineseZodiacSign = chineseZodiacMap.get((year - 4) % 12) + ".";
    }
    return chineseZodiacSign;
  },
  
  getChineseZodiacSignPicture: function(chineseZodiacSign) {
    console.log("Getting chinese zodiacSign picture for: ", chineseZodiacSign);
    let chineseZodiacPicture = zodiacSignPictureMap.get(chineseZodiacSign);
    console.log("chineseZodiacPicture in getChineseZodiacSignPicture: ",chineseZodiacPicture)
    return chineseZodiacPicture;
  },

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
