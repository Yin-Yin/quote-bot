# Zodiac Sign Bot #
A simple bot that calculates zodiac signs for dates that you give it and gives you information about star signs. You can talk tp the bot in natural language.

This is the webhook for API.ai. You can find a web demo of the bot here: https://bot.api.ai/zodiacsignbot

You can talk to the bot on Telegram: _'@zodiacsignbot'_ and on kik: _'zodiacsignbot'_.


The bot has the following functionality at the moment: 

1. **Get the zodiac sign for a date:**
Input a date and the bot will calculate the zodiac sign for that date.
Input Examples: "April 20", "Get the zodiac sign for April 20th", "12.03.2003", "11/02/1992", "September five", etc. 

2. **Get information about a zodiac sign:**
Provide a specific zodiac sign to get information about this zodiac sign. To have a simpler user experience you can choose from a list by typing "list" or "choose from list" If you have provided a date or a zodiac sign before the last zodiac sign from the context will be taken. Then it is enough to just write: "info"
Input Examples: "Aries", "Tell me something about pisces.", "info taurus"; with context: "info", "information"

3. **Get the chinese zodiac sign for a year or age:**
Give the bot a year or an age, and the bot will thell you the correlating chinese zodiac sign for this date. Chinese zodiac signs repeat every 12 years and are dependent on the year you are born.
Input Examples: "1992", "21", "age 41" "chinese zodiac 1965"; with context: "chinese zodiac"

4. **Horoscope.**
The bot can give you horoscopes. Type "horoscope" to get the horoscope for pisces. The horoscopes are fetched from this API: http://sandipbgt.com/theastrologer-api/.
Input Examples: "horoscope pisces"; with context: "horoscope"

5. **Help**
I tried to make the help useful by providing quick actions that guide the user to the most important functionalities of the bot.s
Input Examples: "help"

6. **Small Talk:**
The bot also knows a bit of small talk.
Input Examples: "Hi", "Tell me a joke,", "How are you?"

Knwon bugs/improvements: 
- When there are quick actions visible and you are away for more than 19 (?) minutes the context is lost and the user will be asked for input again. 
- 

toDos:
-improve texts of zodiac signs
-improve pictures of zodiac signs
-make quick responses smarter
-add some jokes that are not too bad