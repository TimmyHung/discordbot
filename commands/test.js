const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")
const ok = "✅";
const no = "❌";

module.exports.run = async (bot, message, args) =>{

       //伺服器資訊Embed
  // setInterval(function () {
    var request = require('request');
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mainPort; //伺服器偵測用API
    var mcIP = '114.35.249.143'; //主機IP
    var bungeePort = 25565; // 分流port
    var mainPort = 25568; // 主線port
    var lobbyPort = 25568; // 大廳port
    var skyblockPort = 25568; // 空島port
    var prisonPort = 25568; // 監獄port
    var testchannel = bot.channels.get("649553237384495104") // 測試頻道ID

    request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          return message.reply('[錯誤]無法取得伺服器狀態...');
      }
      body = JSON.parse(body);
      var stat = '**伺服器未開啟**'
      let statue = "離線❌";
      let player = "N/A";
      let statEmbed = new Discord.RichEmbed()
        .setColor(colors.darkblue)
        .setAuthor(`伺服器分流狀態一覽表`)
        .setDescription(`**分流:** 主線\n**狀態:** ${statue}\n線上人數: ${player}`)
      
      if(body.online == "true") {
          stat = '**伺服器上線中**'
          stat += '**' + body.players.now + '** 人正在線上!'
          status = "線上✅";
          player = `${body.players.now} / ${body.players.max}`;
      }
      testchannel.send(stat);
      // testchannel.send(statEmbed);
// }, 10000);
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