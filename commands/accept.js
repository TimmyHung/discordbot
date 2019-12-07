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

if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("[錯誤]權限不足");
if(message.member.roles.some(r=>[role.dcadmin, role.admin].includes(r.name))) return message.channel.send("[錯誤]權限不足");
if(!message.member.roles.has(role.dcadmin)){ 
} else if(message.channel.id != 648476721200496670)
        return message.channel.send(`[錯誤]槓你的到正確的頻道使用啦 (${punishchannel})`)
    
    let accepter = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!accepter) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help accept` 查看指令說明")
            .then(() => message.react('❌'))

    if(accepter.roles.has(role.member))
        return message.channel.send("[錯誤]該玩家已經是正式會員了")
        
    if(!accepter.roles.has(role.pending))
        return message.channel.send("[錯誤]該玩家並沒有提出審核申請")
    
    let playerRole = message.guild.roles.get(`557565545898049536`)
    let newbieRole = message.guild.roles.get(`616469184905478160`)

    accepter.addRole(playerRole)
    accepter.removeRole(newbieRole)
    accepter.removeRole(role.pending)

    message.channel.send(`用戶:${accepter.user.username} 的暱稱審核已通過:white_check_mark:`)
    
    
    message.delete()
    
    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.green)
    .setAuthor("暱稱審核結果", message.guild.iconURL)
    .addField("申請用戶:", accepter.user.tag)
    .addField("用戶暱稱:", accepter.displayName)
    .addField("審核結果:", "通過")
    .setTimestamp()
    .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    accepter.send(pEmbed)

}
module.exports.config = {
    name: "accept",
    aliases: ["accept"],
    usage: `${prefix}accept <@用戶>`,
    description: "審核暱稱時使用",
    noalias: "無指令縮寫",
    user: "`DC小管理`"
}