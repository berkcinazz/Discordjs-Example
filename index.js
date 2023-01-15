const discord = require('discord.js');
const client = new discord.Client();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, 'config.env') })
const prefix = process.env.PREFIX;
const authorId = process.env.AUTHOR_ID;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let messageResponses = {
    "ping" : "pong",
    "author" : `Here is bot author <@${authorId}>`,
    "github" : "Here is bot author github account https://github.com/berkcinazz",
    "reach" : "You can reach out to the bot author from this email berk.cinaz@gmail.com",
    "linkedin" : "Here is bot author linkedin account https://www.linkedin.com/in/berk-cinaz-3b60291bb/",
    "twitter" : "Here is bot author twitter account https://twitter.com/berkcinazz",
    "hello": "hi",
    "hi": "hello"
}
getValueOfKeyFromObject = (obj, key) => Object.entries(obj).filter(([k]) => k === key).map(([k, v]) => v)[0];

client.on('message', msg => {
    if(!msg.content.startsWith(prefix)) return;

    let messageWithoutPrefix = msg.content.slice(prefix.length, msg.content.length);
    let responseValue = getValueOfKeyFromObject(messageResponses, messageWithoutPrefix.toLowerCase());

    if(responseValue) msg.reply(responseValue);

});

client.on('guildMemberAdd', member => {
  member.send('Welcome to my server!');
});

let token = process.env.DISCORD_BOT_TOKEN;
client.login(token);