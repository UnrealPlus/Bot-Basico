const express = require('express');
const app = express();
app.get("/", (request, response) => {
const ping = new Date();
ping.setHours(ping.getHours() - 3);
console.log(`Bot online. Ping ás ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
response.sendStatus(200);
});
app.listen(process.env.PORT);


const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
  token: process.env['token'],
  prefix: ["$getServerVar[prefix]"],
  intents: [""] //coloque suas intents. caso não saiba, use all (o que não é recomendado)
})

//variáveis 

bot.variables({
  prefix: "!",
})

//atualizar comandos

bot.command({
  name: "updateCommands",
  aliases: ["uc", "updatecommands"],
  code: `$updateCommands
🎯 | comandos upados
$reply
$onlyForIDs[$botOwnerID;]
  `
})

//eval. é um comandos onde você possa executar um código no pórprio Discord

bot.command({
name: "eval",
code: `
$eval[$message]
$onlyIf[$botOwnerID==$authorID;] 
`})

//handler

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd, "./comandos/") //crie uma pasta chamada "comandos", e nela você crie seus comandos. literalmente 😅

loader.setColors({
  walking: ["blink", "dim", "fgWhite"],
  failedWalking: {
    name: ["bright", "fgYellow", "underline"],
 
    text: ["bright", "fgRed"]
  },
  typeError: {
    command: ["bright", "fgYellow"],
    type: ["fgYellow"],
    text: ["bright", "fgRed"]
  },
  failLoad: {
    command: ["bright", "fgMagenta"],
    type: ["fgRed"],
    text: ["bright", "fgRed"],
  },
  loaded: {
    command: ["bright", "fgCyan"],
    type: ["bright", "fgBlue"],
    text: ["bright", "fgGreen"]
  },
})

//callbacks. são eventos, onde seu bot possa escutar e executar o comando

bot.onMessage();
bot.onMessageUpdate();
bot.onMessageDelete();
bot.onInteractionCreate();
bot.onJoin();
bot.onGuildJoin();
bot.onChannelDelete();
