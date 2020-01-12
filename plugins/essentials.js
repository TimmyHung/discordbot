const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.pluginhelp = {
    name: "help",
    aliases: ["help", "commands"],
    info: "測試\n"
}