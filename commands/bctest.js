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
let notifychannel = message.guild.channels.get("645846237190291516")

if(!message.member.roles.has(role.admin)) return message.channel.send("[錯誤]權限不足")
    .then(() => message.react('❌'))
    
    let title = args[0]
    let text;

    if(!title){
        message.delete()
        message.channel.send("[提示]請輸入公告標題後再輸入內容")
        .then(m => m.delete(3000))
    }else{
        if(title){
            message.delete()
    
            text = args.slice(1).join(" ")
            if(!text) return message.channel.send("[提示]請輸入公告內容")
            .then(m => m.delete(3000))
            
            let bcEmbed = new Discord.RichEmbed()
            .setColor(colors.darkred)
            .setAuthor(`${title}`, message.author.displayAvatarURL)
            .setDescription(text)
            .setFooter(`P.E.T伺服器公告 • 由${message.member.user.tag}發布`)

            let privateEmbed = new Discord.RichEmbed()
            .setColor(colors.darkred)
            .setAuthor(`${title}`, message.author.displayAvatarURL)
            .setDescription(text)
            .addField("[小提醒]", `如果覺得通知打擾到您，可以選擇至${notifychannel}關閉通知。`)
            .setFooter(`P.E.T伺服器公告 • 由${message.member.user.tag}發布`)

            broadcastchannel.send(bcEmbed)
			message.member.send(privateEmbed)

        }
    }
}
module.exports.config = {
    name: "broadcasttest",
    aliases: ["bctest"],
    usage: `${prefix}broadcasttest <公告標題> <公告內容>`,
    description: "測試伺服器公告外觀",
    //noalias: "無指令縮寫",
    user: "`全能管理`"
}