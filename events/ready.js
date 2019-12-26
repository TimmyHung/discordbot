const Discord = require("discord.js")
const client = new Discord.Client();


module.exports = bot => {
    console.log(`${bot.user.username} 已上線!`)


    let channel = bot.channels.get('656086848627671070');

    channel.join()
    .then(connection => {
      console.log("已進入指揮中心!");
    }).catch(e => {
      console.error(e);
    })

    //if (!channel) return console.error("指定頻道不存在");
    //bot.user.setActivity("智障獨角獸", {type: "WATCHING"})
    let statuses = [
        "PETTW.ONLINE",
        "P.E.T伺服器",
        "!help 查看指令幫助",
    ] 

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, {type: "PLAYING"})
        bot.user.setStatus('idle')
    }, 5000)

    const guild = bot.guilds.get("300204064451461132");
   setInterval(function () {
      var memberCount = guild.members.filter(member => !member.user.bot).size;  
      var memberCountChannel = bot.channels.get("659674065857937408");
      memberCountChannel.setName(`📐用戶統計 ${memberCount}人`);
   }, 1000);


   //伺服器資訊Embed
   setInterval(function () {
    var request = require('request');
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort; //伺服器偵測用API
    var mcIP = '114.35.249.143'; //主機IP
    var bungeePort = 25565; // 分流port
    var mainPort = 25568; // 主線port
    var lobbyPort = 25568; // 大廳port
    var skyblockPort = 25568; // 空島port
    var prisonPort = 25568; // 監獄port
    var testchannel = bot.guild.channels.get("649553237384495104") // 測試頻道ID

    request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          return message.reply('[錯誤]無法取得伺服器狀態...');
      }
      body = JSON.parse(body);
      let statue = "離線❌";
      let player = "N/A";
      let statEmbed = new Discord.RichEmbed()
        .setColor(colors.darkblue)
        .setAuthor(`分流狀態一覽表`, bot.guild.displayAvatarURL)
        .setDescription(`**分流:** 主線\n**狀態:** ${statue}\n線上人數: ${player}`)
      
      if(body.online) {
          status = "線上✅";
          player = `${body.players.now} / ${body.players.max}`;
      }
      testchannel.send(statEmbed);
 }, 1000);
})





} //結束