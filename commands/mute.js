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

//取得禁言權限組
let muterole = message.guild.roles.find(r => r.name === "禁止發言")
if(!muterole) return message.channel.send("[提示]唉呀...看來沒有**禁止發言**的權限組存在，先去新增一個吧!")
    

//確認禁言原因
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help mute` 查看指令說明")
        .then(() => message.react('❌'));

let reason = args.slice(1).join(" ");
if(!reason) reason = "無原因可提供"



//新增禁言權限組給玩家
mutee.addRole(muterole.id).then(() => {
    message.delete();
    message.channel.send(`用戶:${mutee.user.username} 已被永久禁止發言，原因: ${reason}。`).then(m => m.delete(5000));
    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.orange)
    .setAuthor("違規行為告知", message.guild.iconURL)
    .addField("懲處類別:", "永久禁止發言")
    .addField("違規原因:", reason)
    .addField("違規群組:", message.guild.name)
    .addField("操作人員:", message.author.tag)
    .addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
    
    mutee.send(pEmbed);
})

//發送紀錄訊息

let embed = new Discord.RichEmbed()
.setColor(colors.orange)
.setAuthor("伺服器懲處紀錄", message.guild.iconURL)
.addField("懲處類別:", "永久禁止發言")
.addField("違規用戶:", mutee.user.tag)
.addField("違規原因:", reason)
.addField("操作人員:", message.author.tag)
.addField("執行日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))

let sChannel = message.guild.channels.find(c => c.name === "測試頻道")
sChannel.send(embed)

}
module.exports.config = {
    name: "mute",
    aliases: ["mute"],
    usage: `${prefix}mute <@成員> <原因>`,
    description: "用戶發言極度不正當時使用的懲處指令",
    noalias: "無指令縮寫",
    user: "`DC小管理`"
}