const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")
const ok = "✅";
const no = "❌";

module.exports.run = async (bot, message, args) =>{

    
    if(message.member.roles.has(role.member))
        return message.channel.send("[錯誤]你已經是正式會員了，沒有必要使用這個指令!")
    if(message.member.roles.has(role.pending))
        return message.channel.send("[錯誤]你的審核要求已送出，重複申請並不會讓你更快通過審核，請耐心等候!").then(m => m.delete(5000));
    let newbierole = message.guild.roles.get(`616469184905478160`)
    let verifier = message.member

    message.channel.send("[提示]請查看你的私訊").then(m => m.delete(5000));
    verifier.removeRole(newbierole)
    verifier.addRole(role.pending)
    message.delete()

    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.darkblue)
    .setAuthor("暱稱審核申請已成功送出", message.guild.iconURL)
    .addField("申請用戶:", verifier.user.tag)
    .addField("用戶暱稱:", verifier.displayName)
    .addField("用戶須知:", "審核將於一天內完成\n還請您耐心等候通知")
    .setTimestamp()
    .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    verifier.send(pEmbed)

    let adminchannel = message.guild.channels.get("648476721200496670")

    let nickEmbed = new Discord.RichEmbed()
    .setColor(colors.white)
    .setAuthor("暱稱審核申請", message.guild.iconURL)
    .addField("申請用戶:", `${verifier.user.tag} (${verifier.user.id})`)
    .addField("申請暱稱:", verifier.displayName)
    .addField("審核通過指令:", `${prefix}accept @${verifier.user.tag}`)
    .addField("審核駁回指令:", `${prefix}deny @${verifier.user.tag} <駁回原因>`)
    .setTimestamp()
    .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    adminchannel.send(nickEmbed)
}
module.exports.config = {
    name: "verify",
    aliases: ["verify"],
    usage: `${prefix}verify`,
    description: "提出暱稱審核申請",
    noalias: "無指令縮寫",
    user: "`非正式會員`"
}