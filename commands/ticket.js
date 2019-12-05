const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{


}

module.exports.config = {
    name: "ticket",
    aliases: ["ticket"],
    usage: `${prefix}ticket`,
    description: "直接與管理人員詢問重要問題(暫時不使用)",
    noalias: "無指令縮寫",
    //user: ""
}