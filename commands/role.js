const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix;
const role = require("../role.json");

//❌

module.exports.run = async (bot, message, args) =>{
    if(!message.member.roles.has(role.admin)) return message.channel.send("[錯誤]權限不足")

    let action = args.join(" ");
    let actionarg;
    let role = args.slice(1).join(" ");
    let roleargs = message.guild.roles.find(name, role);
    let rolemember = message.mentions.members.first() || message.guild.members.get(args[0])

    message.delete()
    if(!action) {
        return message.channel.send("[錯誤]指令用法不正確，是要 add 或是 remove 身分組?")
    }else 
        if(action === add){
            if(!role){
                return message.channel.send("[錯誤]未知的身分組名稱")
            }else if(!rolemember){
                return message.channel.send("[錯誤]未知的用戶名稱")
            }else rolemember.addRole(roleargs.id)
        if(action === false){
            if(!role){
                return message.channel.send("[錯誤]未知的身分組名稱")
            }else if(!rolemember){
                return message.channel.send("[錯誤]未知的用戶名稱")
            }else rolemember.removeRole(roleargs.id)
        }
        }
        }


module.exports.config = {
    name: "role",
    aliases: ["role"],
    usage: `${prefix}role <add/remove> <身分組> <@用戶>`,
    description: "新增或移除某位用戶的身分組",
    noalias: "無指令縮寫",
    user: "`全能管理`"
}