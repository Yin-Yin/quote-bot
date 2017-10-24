const request = require('request');

// toDO: Write better texts for: Aquarius, 
const zodiacSignMap = new Map();
zodiacSignMap.set('Capricorn', 'Capricorn ("The Mountain Sea-goat") ♑\nDates: December 22 – January 19 \nCapricorn is considered an earth sign, negative sign, and one of the four cardinal signs. Capricorn is said to be ruled by the planet Saturn. Its symbol is based on the Sumerians primordial god of wisdom and waters, Enki, with the head and upper body of a goat and the lower body and tail of a fish. Later known as Ea in Akkadian and Babylonian mythology, Enki was the god of intelligence (gestú, literally "ear"), creation, crafts; magic; water, seawater and lakewater (a, aba, ab). The goat part of the symbol depicts ambition, resolute, intelligence, curiosity, but also steadiness, and ability to thrive in inhospitable environments while the fish represents passion, spirituality, intuition, and connection with the soul.');
zodiacSignMap.set('Aquarius', 'Aquarius ("The Waterbearer") ♒\nDates: January 20 – February 18\nThe water carrier represented by the zodiacal constellation Aquarius is Ganymede, a beautiful Phrygian youth. Ganymede was the son of Tros, king of Troy (according to Lucian, he was also the son of Dardanus). While tending to his fathers flocks on Mount Ida, Ganymede was spotted by Jupiter. The king of gods flew down to the mountain in the form of a large bird, whisking Ganymede away to the heavens. Ever since, the boy has served as cupbearer to the gods.');
zodiacSignMap.set('Pisces', 'Pisces ("The Fish") ♓\nDates: February 19 – March 20\nTAccording to British astrologer Alan Leo, Pisces, along with Scorpio and Cancer, compose the triplicity for water signs. The mutability is key to the ever-changing element of water, found in several different forms, much like the transformative aspects found in Christ and Piscean nature. Additionally, these three water signs are considered to be the most fruitful signs, who serve a fertilizing function in nature. He also groups Pisces under the "negative pole;" naturally adept to the astral and psychic worlds. This is resembled in the sign for Pisces (♓), which is composed of two half-circles and a band, signifying the dual nature of man in both the physical world and the unseen realm. According to 20th century astrologer Robert Hand, the fish facing upwards away from the ecliptic is swimming towards the heavens, or is seeking spiritual illumination. The other fish swims along the ecliptic, concerning itself with material matters. T');
// e sign modality for Pisces is mutable. It is part of the group of signs, with Gemini, Virgo, and Sagittarius known as the "mutable signs". \n The last sign of the Zodiac, the Pisces symbol has been said to be a representation of the difficulty in extracting the good from that which appears bad. The moral of the symbol for Pisces is said to be that "the severe season has passed; though your flocks, as yet, do not yield their store, the ocean and rivers are open to you, their inhabitants are placed within your power."[c][ It is generally considered a feminine sign, and colors that have been used to represent the Pisces sign are gray or blue gray. The body parts associated with Pisces are the feet, or the toes. Likewise, astrologists also associate various diseases of the body with the zodiac, and Pisces diseases are those of the feet. This includes gout, lameness, distempers, and sores. Excess of eating and drinking, as well as poisoning related to the consumption of fish and medicines are also shown in Pisces.\nPisces is classified as a short ascension sign; one which takes a shorter amount of time to ascend over the horizon than the other signs. It is also one of the six southern signs, because it is south of the celestial equator when the sun is in it (no longer true). This results in it being seen in the winter sky in the northern hemisphere. Pisces is also considered a bicorporeal or double-bodied sign, as the astrological sign is composed of two fishes.he astrological symbol shows the two fishes captured by a string, typically by the mouth or the tails. The fish are usually portrayed swimming in opposite directions; this represents the duality within the Piscean nature. Although they appear as a pair, the name of the sign in all languages originally referred to only one fish with the exception of Greek, Bulgarian, Dutch, Latvian, Italian.');
zodiacSignMap.set('Aries', 'Aries ("The Ram")\nDates: March 21 – April 19\nAries is symbolized by the ram, which fits very well as this sign is strong, impulsive and has a hot temper. They attack any goal without fear and do not stop until they reach their goal. They get mad fast when they cannot reach a goal, but on the other hand do not hold a grudge for long.\nIts planet is the planet Mars, the planet of fire.');
zodiacSignMap.set('Taurus', 'Taurus ("The Bull")\nDates: April 20 – May 20\nThese animals are very big and strong. Altough most of the time they are very peaceful and just graze.');
zodiacSignMap.set('Gemini', 'Gemini ("The Twins")\nDates: May 21 – June 20\nGemini is cool, because it means sth. like siblings and to have a sibling is a wonderful thing. Even if you may be not have a sibling, with your star sign you do! :)');
zodiacSignMap.set('Cancer', 'Cancer ("The Crab")\nDates: June 21 – July 22\nCancer have two scissors on their hands, which is pretty badass!');
zodiacSignMap.set('Leo', 'Leo ("The Lion")\nDates: July 23 – August 22\nLions are so cool! They are like the kings of animal kingdom!');
zodiacSignMap.set('Virgo', 'Virgo ("The Maiden")\nDates: August 23 – September 22\nVirgos are very intelligent! And beautiful! Your are great!');
zodiacSignMap.set('Libra', 'Libra ("The Scales")\nDates: September 23 – October 22\nLibra means sth. like a scale. So they are very harmonious.');
zodiacSignMap.set('Scorpio', 'Scorpio ("The Scorpion")\nDates: October 23 – November 21\nScorpions are so cool! They have a tail with a sting and two scissor hands!!! Wow! ...');
zodiacSignMap.set('Sagittarius', 'Sagittarius ("The Archer")\nDates: November 22 – December 21\nSagittarius is like bow and arrow. So they know whre to aim.');
zodiacSignMap.set('General', 'General information from Wikipedia:\nWhile Western astrology is essentially a product of Greco-Roman culture, some of its more basic concepts originated in Babylonia. Isolated references to celestial "signs" in Sumerian sources are insufficient to speak of a Sumerian zodiac. Specifically, the division of the ecliptic in twelve equal sectors is a Babylonian conceptual construction.\n\nBy the 4th century BC, Babylonian astronomy and its system of celestial omens had an influence on the culture of ancient Greece, as did the astrology of ancient Egypt by late 2nd century BC. This resulted, unlike the Mesopotamian tradition, in a strong focus on the birth chart of the individual and in the creation of horoscopic astrology, employing the use of the Ascendant (the rising degree of the ecliptic, at the time of birth), and of the twelve houses. Association of the astrological signs with Empedocles four classical elements was another important development in the characterization of the twelve signs.\nThe body of astrological knowledge by the 2nd century AD is described in Ptolemys Tetrabiblos, a work that was responsible for astrologys successful spread across Europe and the Middle East, and remained a reference for almost seventeen centuries as later traditions made few substantial changes to its core teachings.\nSource: https://en.wikipedia.org/wiki/Astrological_sign');

const zodiacSignPictureUrlMap = new Map();
// toDO: use only pictures from wikipedia to be safe! 
// toDo: use smaller pictures to safe us
// toDO: host pictures on own server to avoid hotlinking
zodiacSignPictureUrlMap.set('Capricorn', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Zoo-Capricorn-Mountain-Goat-2389416.jpg');
zodiacSignPictureUrlMap.set('Aquarius', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Poseidon-Zodiac-Sign-Aquarius-Neptune-Composing-1865691.jpg');
zodiacSignPictureUrlMap.set('Pisces', 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pisces_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040147.jpg');
zodiacSignPictureUrlMap.set('Aries', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Horoscope-Aries-Icon-Images-Astrology-Zodiac-639126.jpg');
zodiacSignPictureUrlMap.set('Taurus', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Bos-Primigenius-Taurus-Beef-Cow-Domestic-Cattle-56014.jpg');
zodiacSignPictureUrlMap.set('Gemini', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gemini_-_Horoscope_from_%27The_book_of_birth_of_Iskandar%22_Wellcome_L0040144.jpg');
zodiacSignPictureUrlMap.set('Cancer', 'https://cdn.pixabay.com/photo/2015/02/22/09/39/horoscope-644864_960_720.jpg');
zodiacSignPictureUrlMap.set('Leo', 'https://upload.wikimedia.org/wikipedia/commons/4/47/Lion_%28Panthera_leo%29_eye_close-up.jpg');
zodiacSignPictureUrlMap.set('Virgo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg/1200px-Sidney_Hall_-_Urania%27s_Mirror_-_Virgo.jpg');
zodiacSignPictureUrlMap.set('Libra', 'https://upload.wikimedia.org/wikipedia/commons/3/35/LibraCC.jpg');
zodiacSignPictureUrlMap.set('Scorpio', 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Scorpio-bonatti.png');
zodiacSignPictureUrlMap.set('Sagittarius', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Milky_Way_and_Sagittarius_%28with_note%29.JPG');

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
