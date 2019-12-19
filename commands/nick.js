const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{

let punishchannel = message.guild.channels.get("557512829327114250")

if(message.member.roles.has(role.admin) || message.member.roles.has(role.dcadmin)) {
}else return message.channel.send("[錯誤]權限不足");
// if(!message.member.roles.has(role.dcadmin)){ 
// } else if(message.channel.id != 557512829327114250)
//         return message.channel.send(`[錯誤]槓你的到正確的頻道使用啦 (${punishchannel})`)

if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("[錯誤]我沒有足夠的權限執行這項指令(MANAGE_ROLE)")

let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help nick` 查看指令說明")
        .then(() => message.react('❌'));

let nickname = args.slice(1).join(" ");
if(!nickname) return message.channel.send("[錯誤]請提供一個暱稱")

let reason = args.slice(2).join(" ")
if(!reason) reason = "無原因可提供"



//新增禁言權限組給玩家
mutee.setNickname(nickname).then(() => {
    message.delete();
    message.channel.send(`用戶:${mutee.user.username} 暱稱已更改。`).then(m => m.delete(5000));;
})

//發送紀錄訊息

let embed = new Discord.RichEmbed()
.setColor(colors.darkgreen)
.setAuthor("伺服器紀錄", message.guild.iconURL)
.addField("操作類別:", "更改暱稱")
.addField("更改用戶:", mutee.user.tag)
.addField("更改原因:", reason)
.addField("更改暱稱:", nickname)
.addField("操作人員:", message.author.tag)
.addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))

let sChannel = message.guild.channels.find(c => c.name === "懲處中心")
sChannel.send(embed)

}
module.exports.config = {
    name: "nick",
    aliases: ["setname", "setnick"],
    usage: `${prefix}nick <@用戶> <名稱>`,
    description: "更改用戶暱稱",
    //noalias: "無指令縮寫",
    user: "`DC小管理`"
}