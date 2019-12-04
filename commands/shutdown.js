const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{

    if(message.author.id != "490860337302601738") return message.channel.send("[錯誤]你並不是BOT擁有者，不能執行這個指令")
    .then(() => message.react('❌'));

    try {
        await message.channel.send("BOT正在關機...\n晚安!")

        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }

}

module.exports.config = {
    name: "shutdown",
    aliases: ["shutdown"],
    usage: `${prefix}shutdown`,
    description: "關閉BOT程序",
    noalias: "無指令縮寫",
    user: "`BOT擁有者`"
}