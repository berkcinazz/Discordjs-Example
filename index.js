const { Client, GatewayIntentBits, EmbedBuilder  } = require("discord.js");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "config.env") });
const prefix = process.env.PREFIX;
const authorId = process.env.AUTHOR_ID;
let token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

const settings = {
  prefix: `${prefix}`,
  token: `${token}`,
};

const { Player } = require("discord-music-player");
const { send } = require("process");
const { channel } = require("diagnostics_channel");
const player = new Player(client, {
  leaveOnEmpty: false,
});
client.player = player;

getValueOfKeyFromObject = (obj, key) =>
  Object.entries(obj)
    .filter(([k]) => k === key)
    .map(([k, v]) => v)[0];
checkIsKeyExistsFromObject = (obj, key) =>
  Object.entries(obj).filter(([k]) => k === key).length > 0;

client.on("ready", () => {
  console.log("I am ready to Play Music!");

  client.user.setActivity("Hamsi Bot | !commands"); 
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(settings.prefix)) return;
  let command = message.content
    .slice(settings.prefix.length, message.content.length)
    .split(" ")[0];
  let url = message.content.slice(
    settings.prefix.length + command.length + 1,
    message.content.length
  );
  let guildQueue = client.player.getQueue(message.guild.id);

  if (command === "play") {
    let queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.play(url).catch((err) => {
      if (!guildQueue) queue.stop();
    });
  }

  // if (command === "kick") {
  //   let kickMember = message.mentions.members.first();
  //   kickMember.kick();
  // }

  // if (command === "playlist") {
  //   let queue = client.player.createQueue(message.guild.id);
  //   await queue.join(message.member.voice.channel);
  //   let song = await queue.playlist(args.join(" ")).catch((err) => {
  //     console.log(err);
  //     if (!guildQueue) queue.stop();
  //   });
  // }

  if (command === "skip") {
    if (guildQueue) guildQueue.skip();
  }
  if (command === "stop") {
    if (guildQueue) guildQueue.stop();
  }
  if (command === "removeLoop") {
    if (guildQueue) guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
  }
  if (command === "toggleLoop") {
    if (guildQueue) guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
  }
  if (command === "toggleQueueLoop") {
    if (guildQueue) guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
  }
  if (command === "setVolume") {
    if (guildQueue) guildQueue.setVolume(parseInt(args[0]));
  }
  if (command === "seek") {
    if (guildQueue) guildQueue.seek(parseInt(args[0]) * 1000);
  }
  if (command === "clearQueue") {
    if (guildQueue) guildQueue.clearQueue();
  }
  if (command === "shuffle") {
    if (guildQueue) guildQueue.shuffle();
  }
  if (command === "getQueue") {
    console.log(guildQueue);
  }
  if (command === "getVolume") {
    console.log(guildQueue.volume);
  }
  if (command === "nowPlaying") {
    console.log(`Now playing: ${guildQueue.nowPlaying}`);
  }
  if (command === "pause") {
    if (guildQueue) guildQueue.setPaused(true);
  }
  if (command === "resume") {
    if (guildQueue) guildQueue.setPaused(false);
  }
  if (command === "remove") {
    if (guildQueue) guildQueue.remove(parseInt(args[0]));
  }
  if (command === "createProgressBar") {
    const ProgressBar = guildQueue.createProgressBar();
    console.log(ProgressBar.prettier);
  }
  if (command === "move") {
    if (guildQueue) guildQueue.move(parseInt(args[0]), parseInt(args[1]));
  }

  if(command === "commands"){
    const commandsEmbed = {
      color: 0x0099ff,
      title: 'Commands',
      author: {
        name: `${client.user.username}`,
        icon_url: 'https://www.esk.gov.tr/upload/Node/10976/pics/Hamsi.350px.jpg',
      },
      description: 'Here is some commands for you',
      thumbnail: {
        url: 'https://www.esk.gov.tr/upload/Node/10976/pics/Hamsi.350px.jpg',
      },
      fields: [
        {
          name: '\u200b',
          value: '\u200b',
          inline: false,
        },
        {
          name: '!play',
          value: 'It plays the music you want.',
        },
        {
          name: '!skip',
          value: 'It skips the music you want.',
        },
        {
          name: '!removeloop',
          value: 'It removes the loop.',
        },
        {
          name: '!toggleloop',
          value: 'It toggles the loop.',
        },
        {
          name: '!togglequeueloop',
          value: 'It toggles the queue loop.',
        },
        {
          name: '!setvolume',
          value: 'It sets the volume.',
        },
        {
          name: '!seek',
          value: 'It seeks the music.',
        },  
        {
          name: '!clearqueue',
          value: 'It clears the queue.',
        },
        {
          name: '!shuffle',
          value: 'It shuffles the queue.',
        },
        {
          name: '!getqueue',
          value: 'It gets the queue.',
        },
        {
          name: '!getvolume',
          value: 'It gets the volume.',
        },
        {
          name: '!nowplaying',
          value: 'It gets the now playing music.',
        },
        {
          name: '!pause',
          value: 'It pauses the music.',
        },
        {
          name: '!resume',
          value: 'It resumes the music.',
        },  
        {
          name: '!remove',
          value: 'It removes the music from the queue.',
        },
        {
          name: '!createprogressbar',
          value: 'It creates the progress bar.',
        },
        {
          name: '!move',
          value: 'It moves the music from the queue.',
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `${client.user.username}`,
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };

    message.channel.send({ embeds: [commandsEmbed] });
  }



  let messageResponses = {
    ping: "pong",
    author: `Here is bot author <@${authorId}>`,
    github: "Here is bot author github account https://github.com/berkcinazz",
    reach:
      "You can reach out to the bot author from this email berk.cinaz@gmail.com",
    linkedin:
      "Here is bot author linkedin account https://www.linkedin.com/in/berk-cinaz-3b60291bb/",
    twitter:
      "Here is bot author twitter account https://twitter.com/berkcinazz",
    hello: "hi",
    hi: "hello",
  };

  if (checkIsKeyExistsFromObject(messageResponses, command.toLowerCase())) {
    message.reply(
      getValueOfKeyFromObject(messageResponses, command.toLowerCase())
    );
  }
});

client.on("guildMemberAdd", (member) => {
  member.send("Welcome to the server!");
});

client.login(settings.token);