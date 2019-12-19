const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{

let punishchannel = message.guild.channels.get("557512829327114250")

if(!message.member.roles.has(role.admin) || !message.member.roles.has(role.dcadmin)) return message.channel.send("[錯誤]權限不足");
if(!message.member.roles.has(role.dcadmin)){ 
} else if(message.channel.id != 557512829327114250)
        return message.channel.send(`[錯誤]槓你的到正確的頻道使用啦 (${punishchannel})`)

//查看指令使用者和BOT是否有權限
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("[錯誤]我沒有足夠的權限執行這項指令(BAN_MEMBERS)")

//確認禁言原因
let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!banMember) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help ban` 查看指令說明")
        .then(() => message.react('❌'));

let reason = args.slice(1).join(" ");
if(!reason) reason = "無原因可提供"

if(banMember == message.author)
    return message.channel.send("[錯誤]你不能封鎖自己!")
    .then(() => message.react('❌'));

//先發送訊息給被違規用戶
    message.delete();
    message.channel.send(`用戶:${banMember.user.username} 已被永久封鎖，原因: ${reason}。`).then(m => m.delete(5000));
    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.red)
    .setAuthor("違規行為告知", message.guild.iconURL)
    .addField("懲處類別:", "永久封鎖")
    .addField("違規原因:", reason)
    .addField("違規群組:", message.guild.name)
    .addField("操作人員:", message.author.tag)
    .addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
    .addField("申訴管道:", "[Facebook粉絲專頁](https://zh-tw.facebook.com/PETServer)")

//執行封鎖
    banMember.send(pEmbed)
    banMember.send("如果對於自己的處分有任何疑問，歡迎來訊至我們的粉絲專頁").then(() =>
    message.guild.ban(banMember)).catch(err => console.log(err))

//發送紀錄訊息

let embed = new Discord.RichEmbed()
.setColor(colors.red)
.setAuthor("伺服器懲處紀錄", message.guild.iconURL)
.addField("懲處類別:", "永久封鎖")
.addField("違規用戶:", banMember.user.tag)
.addField("違規原因:", reason)
.addField("操作人員:", message.author.tag)
.addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))

let sChannel = message.guild.channels.find(c => c.name === "懲處中心")
sChannel.send(embed)

}
module.exports.config = {
    name: "ban",
    aliases: ["ban"],
    usage: `${prefix}ban <@用戶> <原因>`,
    description: "將指定用戶從這個伺服器封鎖",
    noalias: "無指令縮寫",
    user: "`DC小管理`"
}