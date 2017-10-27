const request = require('request');

// toDO: Write better texts for: Capricorn, Taurus, Libra, 
const zodiacSignMap = new Map();
zodiacSignMap.set('Capricorn', 'Capricorn ("The Mountain Sea-goat") ♑\nDates: December 22 – January 19 \nCapricorn is considered an earth sign, negative sign, and one of the four cardinal signs. Capricorn is said to be ruled by the planet Saturn. Its symbol is based on the Sumerians primordial god of wisdom and waters, Enki, with the head and upper body of a goat and the lower body and tail of a fish. Later known as Ea in Akkadian and Babylonian mythology, Enki was the god of intelligence (gestú, literally "ear"), creation, crafts; magic; water, seawater and lakewater (a, aba, ab). The goat part of the symbol depicts ambition, resolute, intelligence, curiosity, but also steadiness, and ability to thrive in inhospitable environments while the fish represents passion, spirituality, intuition, and connection with the soul.');
zodiacSignMap.set('Aquarius', 'Aquarius ("The Waterbearer") ♒\nDates: January 20 – February 18\nAquarius embodies both stability and the desire to roam freely. This conflict makes it a very interesting sign. Which side should it follow? This makes them very interesting. They are communicative, yet guarded, always seeking the new, but they still like to stay with the things they know. They are the most freedom seeking sign of the zodiac. Still they are the most devoted and loyal of all signs. ');
zodiacSignMap.set('Pisces', 'Pisces ("The Fish") ♓\nDates: February 19 – March 20\nPisces are symbolised by two fishes and are a water sign. They are described as feeling comfortable to go with the flow. Following someone elses lead, especially if it is a loved one, is perfectly fine for pisces. It is a very romantic sign, which has a good connection to its instinct and can intuit the needs of their friends and partners very well. Pisces like fantasies and imagination a lot. They are also very idealistic.');
zodiacSignMap.set('Aries', 'Aries ("The Ram") ♈\nDates: March 21 – April 19\nAries is symbolized by the ram, which fits very well as this sign is strong, impulsive and has a hot temper. They attack any goal without fear and do not stop until they reach their goal. They get mad fast when they cannot reach a goal, but on the other hand do not hold a grudge for long.\nIts planet is the planet Mars, the planet of fire.In western astrology, Aries is a sign of initiative; a leader, with bravery, and the autonomy required to commence. Uncomfortable with inaction, Aries is the Cardinal sign of Fire, and thus is the zodiac of drive. Ruled by Mars, Aries is strongly autonomous, and can be headstrong and crass, sometimes showing an impulsive or reckless approach to issues. With the Ram as their standard, Aries tends toward obstinate and self-seeking. Jaunty and self-supporting, Aries is capable of independence. This quality may encourage others to emulate—but Aries is unlikely to pause for supporters. When Aries is found in a chart, there is enthusiasm and decisiveness. People under the Aries sign are believed to be like a child who is frank, enthusiastic, fierce, a bit hotheaded and too loyal to their friends. Since Aries is the first astrological sign in spring during which everything comes to life, the Arians are believed to be always vigorous and passionate. ' );
zodiacSignMap.set('Taurus', 'Taurus ("The Bull") ♉\nDates: April 20 – May 20\nTaurus was the first sign of the zodiac established among the ancient Mesopotamians – who knew it as the Bull of Heaven – because it was the constellation through which the sun rose on the vernal equinox at that time. Due to the precession of the equinox, it has since passed through the constellation Aries and into the constellation Pisces (hence our current era being known as the Age of Pisces). The Bull represents a strong-willed character with great perseverance and determination. In Egypt, Taurus was seen as the cow goddess Hathor. Hathor was the goddess of beauty, love, and happiness, and she represented all of the riches seen in cattle as the providers of nourishment. Roman astrologers considered Taurus ruled by Venus, the goddess of beauty, and Earth, the goddess of the earth and nature. Taurus is opposite to Scorpio.)')
zodiacSignMap.set('Gemini', 'Gemini ("The Twins") ♊\nDates: May 21 – June 20\nAstrologers believe Geminis have a volatile temperament, that their strength however is their versatility, and that their versatility allows them to learn a little about everything and develop skills in many areas. Geminis are considered to hold mysteriously unique artistic and creative abilities unlike other signs. Often considered to be very intelligent individuals, they have a wide appreciation for the arts, philosophy, history and the natural sciences. They do not like boring people or routine procedures and therefore struggle to deal with authoritative figures. They are enlightened to talk about any subject which they find interesting and where they can stimulate their naturally intellectual personalities. Geminis are noted to be drastic and hasty yet very responsible and disciplined. They are considered to be the most misunderstood of all signs due to their dual personality expressed by the twins of their sign. Because of this, dont be surprised to often find Geminis in different moods and therefore mood swings can occur often for Geminis because of their high degree of mental processing and thinking. This makes them quite philosophical people. Geminis are sensitive as well but use their high intelligence to counter anything that upsets them. Geminis usually get along very well with Leos, Aries and Sagittariuses. They do not see eye to eye with Pisces, Cancers, Virgos and Scorpios. Gemini are best suited for people of Aquarius and Libra signs but also go well with Capricorns, and Taurus signs.');
zodiacSignMap.set('Cancer', 'Cancer ("The Crab") ♋️\nDates: June 21 – July 22\nThe sign of Cancer is said to be associated with the characteristics: introspective, phlegmatic, cardinal, nocturnal, tenacious, intuitive, emotional, indolent, domestic, eloquent, refined, empathic, and clairvoyant. Geographical locations that Cancer is associated with are the sea, rivers, lakes, brooks, wells, wash-houses, marsh grounds, trenches, sinks, cellars, and other locations marked by a presence of water. The areas of the body that Cancer governs are the breast and the stomach.\nCancerians are said to be people of sensation and feeling, and are considered by many astrologers to be the most sensitive sign of the zodiac. They tend to judge the world through intuition as opposed to logic. They are highly spiritual but are also characterized by emotional tension and heightened ambition. Cancer is considered one of the most enigmatic signs of the zodiac, an association largely attributed to its ruling planet being that of the Moon.');
zodiacSignMap.set('Leo', 'Leo ("The Lion") ♌\nDates: July 23 – August 22\nAstrologers describe this sign with the qualities that describe Lions: leadership, pride, warmth, courage and strength. This sign likes the exciting and dramatic. Leos like to be in the center of attention and can get stubborn when they dont get their way. Despite what can be perceived as egotism they make really loving and devoted friends. As long as they feel they get enough attention they return it with grand gestures of devotion. ');
zodiacSignMap.set('Virgo', 'Virgo ("The Maiden") ♍\nDates: August 23 – September 22\nAstrologers ascribe certain personality traits to a person born under the Virgo: people born under this sign are typically analytical, kind, hardworking and practical. According to astrologers, Virgos tend to worry often; they are shy and dislike being the center of attention. They are also known for being modest, faithful, quiet, and very persuasive, as well as for having a good sense of reasoning and memory. Virgos are also known for their intellect and usually enjoy art, literature, science, mathematics, and are skilled at completing detailed work.');
zodiacSignMap.set('Libra', 'Libra ("The Scales") ♎\nDates: September 23 – October 22\nLibra is one of the three zodiac air signs, the others being Gemini and Aquarius. The sign of Libra is symbolized by the gryphon, a mythological creature with the head, wings and talons of an eagle and hind legs of a lion. According to the Romans in the First Century, Libra was a constellation they idolized. The moon was said to be in Libra when Rome was founded. Everything was balanced under this righteous sign. The Roman writer Manilius once said that Libra was the sign "in which the seasons are balanced". Both the hours of the day and the hours of the night match each other. Thus why the Romans put so much trust in the "balanced sign". Going back to ancient Greek times, Libra the constellation between Virgo and Scorpio used to be over ruled by the constellation of Scorpio. They called the area the Latin word "chelae", which translated to "the claws" which can help identify the individual stars that make up the full constellation of Libra, since it was so closely identified with the Scorpion constellation in the sky.\nThe symbol of the scales is based on the Scales of Justice held by Themis, the Greek personification of divine law and custom. She became the inspiration for modern depictions of Lady Justice. The ruling planet of Libra is Venus. Libra is the only zodiac constellation in the sky represented by an inanimate object. The other eleven signs are represented either as an animal or mythological characters throughout history.');
zodiacSignMap.set('Scorpio', 'Scorpio ("The Scorpion") ♏\nDates: October 23 – November 21\nAstrologers believe Scorpios are ruled by their desires, but that their strength is resourcefulness, and that their resourcefulness allows them to control their desires unless they have a plan to achieve them. Scorpios are analytical and meditative, and ponder data to create a realistic plan; self-deception is not something a Scorpio does. The Scorpio is secretive and intense, though their careful approach to planning and action can appear as a lack of intensity. The Scorpio is good at hiding their feelings, which can cause problems in their relationships. They do not try to please others, and do not care what the world thinks of them.');
zodiacSignMap.set('Sagittarius', 'Sagittarius ("The Archer") (♐\nDates: November 22 – December 21\nThis sign is symbolized by the Archer. It is like they are shooting out arrow after arrow towards the horizon. They are striking out into the unknown, believing in the idealistic possibilities in the universe. They are seeminlgy falling into great experiences and oppotrunities without much effort. This is because their mutable nature lets them go with the flow and change their course in the moment, when its needed. They dont like details very much as they are getting too excited about the big picture. They make great lifelong learners and teachers and love the adventure. This sign likes people and experiences so much that it can find it hard to settle down with just one person.');
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
