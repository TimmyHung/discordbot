const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix;
const reqrole = require("../role.json");

//❌

module.exports.run = async (bot, message, args) =>{
    if(!message.member.roles.has(reqrole.admin)) return message.channel.send("[錯誤]權限不足")

    let rolemember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!rolemember) return message.channel.send("[錯誤]未知的用戶名稱")
    
    let actionarg;
    let role = args.join(" ").slice(1);
    if(!role) return message.channel.send("[錯誤]請輸入身分組名稱")
    let roleargs = message.guild.roles.find(`name`, role);
    if(!roleargs) return message.channel.send("[錯誤]未知的身分組")


    if(rolemember.roles.has(roleargs.id))
    await(rolemember.addRole(roleargs.id))

}
module.exports.config = {
    name: "addrole",
    aliases: ["addrole"],
    usage: `${prefix}role <@用戶> <身分組>`,
    description: "新增用戶的身分組",
    noalias: "無指令縮寫",
    user: "`全能管理`"
}