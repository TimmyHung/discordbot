const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{

    if(message.author.id != "490860337302601738") return message.channel.send("[錯誤]你並不是BOT擁有者，不能執行這個指令")
    .then(() => message.react('❌'));

    if(!args[0]) return message.channel.send("[提示]請輸入您要重新讀取的指令!")
    .then(() => message.react('❌'));

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`[錯誤]無法載入: \`${args[0].toUpperCase()}\``)
    }
    message.channel.send(`指令: \`${args[0].toUpperCase()}\` 已重新讀取成功`)
}

module.exports.config = {
    name: "reload",
    aliases: ["reload"],
    usage: `${prefix}reload <指令名稱>`,
    description: "重新讀取或是載入某個BOT指令",
    noalias: "無指令縮寫",
    user: "`BOT擁有者`"
}