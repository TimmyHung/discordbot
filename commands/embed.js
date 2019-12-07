const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")

module.exports.run = async (bot, message, args) =>{
    message.delete()
    let timmy = message.guild.members.get(role.timmyhung)
    let Membed = new Discord.RichEmbed()
    .setColor(colors.yellow)
    .setAuthor("該怎麼創建問題小房間", message.guild.iconURL)
    .addField("想要直接取得官方協助又不想讓其他人知道?")
    .addField("更換帳號、密碼遺失、外掛舉報卻懶得跑粉專?")
    .addField("在下方輸入你的問題，我們會在最短時間內回覆你!")
    .setFooter(`玩家&官方協助專區•由 ${timmy.user.tag} 開發`, bot.user.displayAvatarURL)
    message.channel.send(Membed)
}

module.exports.config = {
    name: "embed",
    aliases: ["embed"],
    usage: `${prefix}embed`,
    description: "未知",
    noalias: "無指令縮寫",
    user: "BOT擁有者"
}