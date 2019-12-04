const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{
//查看指令使用者和BOT是否有權限
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("你哪根蔥阿，想叫我做事?還太嫩了點");
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
    .addField("執行日期:", message.createdAt.toLocaleString())
    
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
.addField("執行日期:", message.createdAt.toLocaleString())

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