const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix;
const reqrole = require("../role.json");

//❌

module.exports.run = async (bot, message, args) =>{
    message.delete()
    if(!message.member.roles.has(reqrole.admin)) return message.channel.send("[錯誤]權限不足")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("[錯誤]我並沒有足夠的權限(MANAGE_ROLES)")
    
    
    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("[錯誤]未知的用戶名稱")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("[錯誤]請提供一個身分組") 
    let reason = args.slice(2).join(" ")
    if(!reason) reason = "無原因可提供"



    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`[錯誤]${rMember.displayName} 並沒有這個身分組!`).then(m => m.delete(5000))
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`[訊息]身分組:${role.name} 已從用戶 ${rMember.displayName} 移除`).then(m => m.delete(5000))
    }

    let embed = new Discord.RichEmbed()
    .setColor(colors.orange)
    .setThumbnail(rMember.user.displayAvatarURL)
    .setAuthor(`${message.guild.name} 社群紀錄`, message.author.displayAvatarURL)
    .setDescription(`**操作類別:** 移除身分組\n**用戶名稱:** ${rMember.user.tag}\n**身分組:** ${role.name}\n**操作人員:** ${message.author.tag}\n**執行日期:** ${message.createdAt.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}`)
    
    let punishchannel = message.guild.channels.get("557512829327114250")
        punishchannel.send(embed)

}
module.exports.config = {
    name: "removerole",
    aliases: ["delrole","rr","dr"],
    usage: `${prefix}removerole <@用戶> <身分組>`,
    description: "移除身某位用戶的身分組",
    //noalias: "無指令縮寫",
    user: "`全能管理`"
}