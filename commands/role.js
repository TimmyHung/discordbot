const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix;
const reqrole = require("../role.json");

//❌

module.exports.run = async (bot, message, args) =>{
    if(!message.member.roles.has(reqrole.admin)) return message.channel.send("[錯誤]權限不足")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("[錯誤]我並沒有足夠的權限(MANAGE_ROLES)")
    
    
    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("[錯誤]未知的用戶名稱")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("[錯誤]請提供一個身分組") 
    let reason = args.slice(2).join(" ")
    if(!reason) reason = "無原因可提供"



    if(rMember.roles.has(role.id)) {
        return message.channel.send(`[錯誤]${rMember.displayName}, 已經有這個身分組了!`).then(m => m.delete(5000))
    } else {
        await rMember.addRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`[訊息]身分組:${role.name} 以新增給用戶 ${rMember.displayName}`).then(m => m.delete(5000))
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.get("649553237384495104")
        sChannel.send(embed)

}
module.exports.config = {
    name: "addrole",
    aliases: ["addrole"],
    usage: `${prefix}role <@用戶> <身分組>`,
    description: "新增用戶的身分組",
    noalias: "無指令縮寫",
    user: "`全能管理`"
}