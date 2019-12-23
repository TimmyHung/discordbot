const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const ok = "✅";
const no = "❌";
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{

let punishchannel = message.guild.channels.get("648476721200496670")
let broadcastchannel = message.guild.channels.get("649553237384495104")

if(!message.member.roles.has(role.admin)) return message.channel.send("[錯誤]權限不足")
    .then(() => message.react('❌'))
    
    let title = args.join("")
    let text;


    if(title){
        message.delete()
        
        text = args.slice(1).join(" ")

        let bcEmbed = new Discord.RichEmbed()
        .setColor(colors.darkred)
        .setAuthor(`${title}`, message.author.displayAvatarURL)
        .setDescription(text)
        .setTimestamp()
        .setFooter(`伺服器公告 • 由${message.member.user.tag}發布`)
        broadcastchannel.send(bcEmbed)
    }else{
        message.delete()
        message.channel.send("[提示]請輸入公告標題後再輸入內容")
        .then(m => m.delete(3000))
    }
}
module.exports.config = {
    name: "broadcast",
    aliases: ["bc", "announcement", "ac"],
    usage: `${prefix}broadcast <公告標題> <公告內容>`,
    description: "管理員公告時使用",
    //noalias: "無指令縮寫",
    user: "`全能管理`"
}