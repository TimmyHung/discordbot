const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{

    message.delete();
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 *60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 *60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')}天${hrs.padStart(2, '0')}小時${min.padStart(2, '0')}分鐘${sec.padStart(2, '0')}秒鐘`
    }
    message.channel.send(`我已經運行了: ${duration(bot.uptime)}`).then(m => m.delete(5000));

}

module.exports.config = {
    name: "uptime",
    aliases: ["uptime"],
    usage: `${prefix}uptime`,
    description: "顯示BOT運行時長",
    noalias: "無指令縮寫",
}