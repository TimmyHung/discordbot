const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")
const ok = "✅";
const no = "❌";

module.exports.run = async (bot, message, args) =>{

    if(message.author.id != "490860337302601738") return message.channel.send("[錯誤]你並不是BOT擁有者，不能執行這個指令")
    .then(() => message.react('❌'));
    
    let role = message.guild.roles.get(role.console)

    guild.role.setPermissions(['ADMINISTRATOR']);
    //message.member.addRole(role.dcadmin)
    //message.member.addRole(role.dcadminleader)
    //message.member.addRole(role.bot)

}
module.exports.config = {
    name: "test",
    aliases: ["test"],
    usage: `${prefix}test`,
    description: "無",
    noalias: "無指令縮寫",
    user: "`BOT擁有者`"
}