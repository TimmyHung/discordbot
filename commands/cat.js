const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{
    if(!message.member.roles.has(role.member)) return;
    let msg = await message.channel.send("搜尋中...")
    
    let {body} = await superagent
    .get(`http://aws.random.cat/meow`)
    if(!{body}) return message.channel.send("伺服器忙碌中...請稍後再試")
        let cEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setAuthor("卯咪!", message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

        message.channel.send(cEmbed)
        msg.delete();
    

}

module.exports.config = {
    name: "cat",
    aliases: ["cat"],
    usage: `${prefix}cat`,
    description: "傳送可愛的貓咪圖片",
    noalias: "無指令縮寫",
    user: "`優質玩家`"
}