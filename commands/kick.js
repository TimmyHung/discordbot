const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{

let punishchannel = message.guild.channels.get("557512829327114250")

if(message.member.roles.some(r=>[role.dcadmin, role.admin].includes(r.name))) return message.channel.send("[錯誤]權限不足");
if(!message.member.roles.has(role.dcadmin)){ 
} else if(message.channel.id != 557512829327114250)
        return message.channel.send(`[錯誤]槓你的到正確的頻道使用啦 (${punishchannel})`)

if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("[錯誤]我沒有足夠的權限執行這項指令(KICK_MEMBERS)")
  
let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
if(!kickMember) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help kick` 查看指令說明")
        .then(() => message.react('❌'));

let reason = args.slice(1).join(" ");
if(!reason) reason = "無原因可提供"


let Kembed = new Discord.RichEmbed()
    .setColor(colors.orange)
    .setAuthor("違規行為告知", message.guild.iconURL)
    .addField("懲處類別:", "踢出伺服器")
    .addField("違規原因:", reason)
    .addField("違規群組:", message.guild.name)
    .addField("操作人員:", message.author.tag)
    .addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
    .addField("申訴管道:", "[Facebook粉絲專頁](https://zh-tw.facebook.com/PETServer)")
message.delete()
kickMember.send("如果對於自己的處分有任何疑問，歡迎來訊至我們的粉絲專頁")
kickMember.send(Kembed).then(() =>
kickMember.kick().catch(err => console.log(err)))
message.channel.send(`用戶:${kickMember.user.username} 已被踢出伺服器，原因: ${reason}。`).then(m => m.delete(5000));

//發送紀錄訊息

let embed = new Discord.RichEmbed()
.setColor(colors.red)
.setAuthor("伺服器懲處紀錄", message.guild.iconURL)
.addField("懲處類別:", "踢出伺服器")
.addField("違規用戶:", kickMember.user.tag)
.addField("違規原因:", reason)
.addField("操作人員:", message.author.tag)
.addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))

let sChannel = message.guild.channels.find(c => c.name === "懲處中心")
sChannel.send(embed)
}
module.exports.config = {
    name: "kick",
    aliases: ["kick"],
    usage: `${prefix}kick <@成員> <原因>`,
    description: "將指定用戶踢出伺服器",
    noalias: "無指令縮寫",
    user: "`DC小管理`"
}