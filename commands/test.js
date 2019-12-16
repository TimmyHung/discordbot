const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")

module.exports.run = async (bot, message, args) =>{
    let mutee = message.members
    mutee.addRole(role.bot)


}
module.exports.config = {
    name: "test",
    //aliases: ["help", "commands"],
    usage: `${prefix}help`,
    description: "未知",
    noalias: "無指令縮寫",
    user: "BOT擁有者"
}