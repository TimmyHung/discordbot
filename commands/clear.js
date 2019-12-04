const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let mEmbed = new Discord.RichEmbed()
    .setColor(colors.blue)
    .setTitle("使用者資訊")
    .setThumbnail(message.guild.iconRUL)
    .setAuthor(`${message.author.username} 資訊`, message.author.displayAvatarURL)
    .addField("名稱:", `${message.author.username}`, true)
    .addField("ID:", `${message.author.id}`, true)
    .addField("狀態:", `${message.author.presence.status}`, true)
    .addField("帳號創建於:", `${message.author.createdAt}`, true)
    .setFooter(`${bot.user.username} || ${bot.user.createdTimestamp}`, bot.user.displayAvatarURL);
    message.channel.send(mEmbed)

}

module.exports.config ={
    name: "clear",
    aliases: ["clear", "purge"],
    usage: `${prefix}clear <訊息數量>`,
    description: "清除指定的訊息數量 最大100則訊息",
    noalias: "無指令縮寫",
    user: "`DC小管理`"

}