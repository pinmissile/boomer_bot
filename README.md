# Boomer Bot
Boomer bot is the worst thing I made. It's an awful discord bot representation of your modern day meme boomer.

## Dependencies

[Get node.js](https://nodejs.org/en/download/)

Clone this repo, navigate to the new directory.
```
git clone https://github.com/pinmissile/boomer_bot.git
cd boomer_bot
```
Install these dependencies via npm.
Take advantage of the time it takes to install these by questioning the life choices that brought you to this point.
```
npm install discord.io
npm install winston
npm install owofy
npm install random-puppy
```

## How to run

Simple.
```
node bot.js
```

## How to contribute to this awful project
You, too, can contribute to this act of human indecency! 
Fork the project, clone the repo to your computer, make a branch, and do a pull request. 
If I don't respond in a reasonable time, feel free to ping me directly.

_I want to add more responses!_
Check out one of the .jsons in the main directory: `christmas.json`, `evil_messages.json`, `rants.json`, `tell_something.json`, `uwu_toggle.json`. 
Add another response in the array, and make sure you [validate your json](https://jsonlint.com/) before you push your improvements. Invalid jsons are almost as bad as Boomer Bot.
_I want to add more functions!_
Cool, just make a branch, do your magic and submit a pull request.
_I don't know how to code, though._
There's a lot of neat guides out there, if you found your way here, you know how to google. Boomer bot isn't rocket science. You'll figure it out, skipper.
_Yeah, but I want you to do it for me._
Submit your requests to bill.gates@microsoft.com.

## How to debug
[Register a discord application](https://discord.com/developers/applications), take note of the Client secret, and make an auth.json.
```
echo {token:"CLIENT_SECRET_GOES_HERE"} > auth.json
```
Find the invite URL, run the bot, and test the bot out on a channel of your choice. 