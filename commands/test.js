const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")
const ping = require("minecraft-server-util")


module.exports.run = async (bot, message, args) =>{

       //伺服器資訊Embed
  // setInterval(function () {
    var request = require('request');
    var mcIP = '114.35.249.143'; //主機IP
    var bungeePort = 25565; // 分流port
    var mainPort = 25568; // 主線port
    var lobbyPort = 25563; // 大廳port
    var skyblockPort = 56353; // 空島port
    var prisonPort = 25578; // 監獄port
    var testchannel = bot.channels.get("649553237384495104") // 測試頻道ID
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + skyblockPort; //伺服器偵測用API

    ping(mcIP, skyblockPort, (error, reponse) =>{
      if(error) throw error
      const Embed = new Discord.RichEmbed()
      .setTitle('伺服器狀態: 空島')
      .addField('伺服器IP', reponse.host)
      .addField('伺服器版本', reponse.version)
      .addField('Online Players', reponse.onlinePlayers + "/" + reponse.maxPlayers)
     
      message.channel.send(Embed)

})

}

module.exports.config = {
    name: "test",
    aliases: ["test"],
    usage: `${prefix}test`,
    description: "無",
    noalias: "無指令縮寫",
    user: "`BOT擁有者`"
}