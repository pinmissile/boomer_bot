// Requirements
const Discord = require('discord.io');
const logger = require('winston');
const owofy = require('owofy');
const randomPuppy = require('random-puppy');
// Authentication
const auth = require('./auth.json');
// Global variables
var patience = 20
var uwu_channel = new Set()
const bot_id = "745342491678736425"
// Messages
var messages = require('./tell_something.json'); 
var rants = require('./rants.json'); 
var christmasMsg = require('./christmas.json'); 
var uwuMsg = require('./uwu_toggle.json'); 
var evilMsg = require('./evil_messages.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function sendMessage(message, channel, uwuride=false){
    // if uwuride is true, it will ignore the uwu mode.
    if (Math.random() >= 0.7){
        // Sends an evil message and then edits the message back to the intended one.
        evilMessage(message, channel);
    }  
    else{
        if (uwu_channel.has(channel) && !uwuride){message = owofy(message)};
        bot.sendMessage({
            to: channel,
            message: message
        });
    }
}

function evilMessage(message, channel){
    let theID = ''
    bot.sendMessage({
        to: channel,
        message: randomMessage(evilMsg)
    }, function (err, res){
        // Picks up the ID of the recently sent message.
        theID = res.id
    });
    setTimeout(function(){
        // Edits that message back to the original one.
        bot.editMessage({
            channelID: channel,
            messageID: theID,
            message: message
        });
    },1000)
}

function randomMessage(message_array){
    return message_array[Math.floor(Math.random() * message_array.length)]
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence( {game: {name:"DM me \"boomer help\""}} );
});

bot.on('message', function (user, userID, channelID, message, evt) {
    message = message.toLowerCase()
    if (userID == bot_id) return;   // We don't want the bot to trigger itself.
    if (message.includes("pastor joel") || message.includes("joel osteen")){
        msg = "GOD BLESS THAT MAN https://www.joelosteen.com/Pages/Give.aspx GIVE HIM YOUR MONEY NOW HE NEEDS IT TO SPEAK WITH GOD"
        sendMessage(msg, channelID)
    }
    else if (message == "ok boomer"){
        patience--;
        if (patience <= 0){
            msg = "I'M SICK AND TIRED OF THIS, YOU KNOW WHAT, I BUILD THIS COUNTRY UP AND I CAN TEAR IT DOWN YOU ENTITLED MILLENNIALS GEN Z!!! YOU LITTLE SHITS DONT KNOW THE MEANING OF HARD LABOUR, WE MADE THIS COUTNRY GREAT AND WE CAN MAKE IT GREATER AGAIN!!! MY PARENTS DIED TO GIVE THIS COUNTRY TO ME AND YOU LITTLE SHITS  DONT KNOW THE MEANING OF TRUE LOYALTY. YOU ARE ALL REMOVED FROM MY WILL"
            sendMessage(msg, channelID);
            patience = 20
        }
    }
    else if (message.includes("boomer")){
        if (message.includes("tell")){
            if (message.includes("something")){
                sendMessage(randomMessage(messages), channelID);
            }
            if (message.includes("rant")){
                msg = rants[Math.floor(Math.random() * rants.length)]
                sendMessage(randomMessage(rants),channelID)
            }
            if (message.includes("meme")){
                // Sends a random meme from /r/boomershumor
                try {
                    randomPuppy('boomershumor')
                    .then(url => {
                        sendMessage(url, channelID, true);
                    })
                } catch (err) {
                    logger.info(err)
                }
            }
        }
        else if (message.includes("merry christmas")){
            sendMessage(randomMessage(christmasMsg), channelID);
        }
        else if (message.includes("opinion on pinmissile")){
            sendMessage("i have nightmares about him every night.",channelID);
        }
        else if (message.includes("opinion on ")){
            // this shit is awful and i hate it
            str_back = message.split("opinion on")[1].toUpperCase()
            if (str_back.includes(" YOUR") && str_back.includes(" MY")){
                str_back = str_back.replace(" YOUR"," TEMP_TEMP_TEMP")
                str_back = str_back.replace(" MY"," YOUR")
                str_back = str_back.replace(" TEMP_TEMP_TEMP"," MY")
            }
            else if (str_back.includes(" YOUR")){
                str_back = str_back.replace(" YOUR"," MY")
            } else if (str_back.includes(" MY")){
                str_back = str_back.replace(" MY"," YOUR")
            } 
            if ((str_back.includes(" I") || str_back.includes(" ME"))  && str_back.includes(" YOU ")){
                str_back = str_back.replace(" YOU"," TEMP_TEMP_TEMP")
                str_back = str_back.replace(" ME"," YOU")
                str_back = str_back.replace(" TEMP_TEMP_TEMP"," ME")
                str_back = str_back.replace(" I"," YOU")
            }
            else if (str_back.includes(" YOU")){
                str_back = str_back.replace(" YOU"," ME")
            } else if (str_back.includes(" I") || str_back.includes(" ME")){
                str_back = str_back.replace(" I"," YOU")
                str_back = str_back.replace(" ME"," YOU")
            } 
            str_back = str_back.replace("?","!")
            msg = "I HATE" + str_back
            sendMessage(msg,channelID);
        }
        else if (message.includes("help")){
            msg = "HELLO AND thank you fgor downloading me to your webzone!!! i am here to tall you about how to make me respond." +
                    "my hearing is not very good and i can only understand certain words, please forgive me, and god bless." +
                    "PLEASE SEND MONEY TO PASTOR JOEL OSTEEN, HE IS A GOOD MAN AND WILL SAVE YOUR SOUL, GOD BLESSSSSSS!!!!\n\n" +
                    "Boomer Bot reacts if certain keywords are mentioned in a phrase. For example: _Boomer_, _tell_ me _something_\n" +
                    "Random boomer phrase: \"boomer\" \"tell\" \"something\"\n" +
                    "Exceedingly long rant (This will spam the shit out of the channel): \"boomer\" \"tell\" \"rant\"\n" +
                    "Boomer meme: \"boomer\" \"tell\" \"meme\"\n" +
                    "Boomer opinion on something: \"boomer\" \"opinion on\", followed by what you want to know boomer bot's opinion on."
            sendMessage(msg, channelID);
        }
        else if(message.includes('uwu') || message.includes('owo')){
            if (!uwu_channel.has(channelID)){
                uwu_channel.add(channelID)
                msg = randomMessage(uwuMsg)
            }
            else {
                uwu_channel.delete(channelID)
                msg = 'you might have ended the horror, but you can never erase what you have done.'
            }
            sendMessage(msg, channelID);
        }
    }
});