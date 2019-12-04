const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{

    if(message.author.id != "490860337302601738") return message.channel.send("[錯誤]你並不是BOT擁有者，不能執行這個指令")
    .then(() => message.react('❌'));

    let argsresult;
    let mChannel =message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

}

module.exports.config = {
    name: "say",
    aliases: ["say"],
    usage: `${prefix}say <#頻道名稱> <訊息>\n${prefix}say <訊息>`,
    description: "使用BOT發言",
    noalias: "無指令縮寫",
    user: "BOT擁有者"
}