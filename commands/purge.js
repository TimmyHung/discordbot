const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{
    if(message.member.roles.has(role.admin) || message.member.roles.has(role.dcadmin)) {
    }else return message.channel.send("[錯誤]權限不足");
    if(isNaN(args[0])) return message.channel.send("[提示]請輸入要清除的訊息數量(1~100)");
    if (args[0] > 100) return message.channel.send("[錯誤]槓你的就說不要超過數字100了")

    message.channel.bulkDelete(args[0])
        .then( messages => message.channel.send(`**成功移除 \`${messages.size}則\` 訊息**`))
        .then(m => m.delete(5000))
        .catch( error => console.log(error))
}

module.exports.config ={
    name: "purge",
    aliases: ["clear", "purge"],
    usage: `${prefix}purge <訊息數量>`,
    description: "清除指定的訊息數量 最大100則訊息",
    user: "`DC小管理`"

}