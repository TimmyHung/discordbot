const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) =>{
message.react('😡');
}



module.exports.config = {
    name: "rage",
    aliases: ["rage", "怒我"],
    usage: `${prefix}rage`,
    description: "不怕沒人怒你"
}