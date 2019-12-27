const Discord = require("discord.js")
const client = new Discord.Client();
const colors = require("../color.json")
const ping = require("minecraft-server-util")

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
   var mcIP = '114.35.249.143'; //主機IP
   var bungeePort = 25565; // 分流port
   var mainPort = 25568; // 主線port
   var lobbyPort = 25563; // 大廳port
   var skyblockPort = 56353; // 空島port
   var prisonPort = 25578; // 監獄port
   var playerchannel = bot.channels.get("660152534068887556") // 測試頻道ID
   var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + skyblockPort; //伺服器偵測用API


   setInterval(function () {
    let mstate;
    let mversion;
    let mplayercount;
   ping(mcIP, skyblockPort, (error, reponse) =>{
     if(error == "Error: connect ECONNREFUSED" + mcIP + ":" + mainPort) {
       mstate = "離線❌"
       mversion = "N/A"
       mplayercount = "N/A"
     }else{
      mstate = "線上✅";
      mversion = reponse.version
      mplayercount = reponse.onlinePlayers + "/" + reponse.maxPlayers
     }

     const Embed = new Discord.RichEmbed()
     .setColor(colors.gold)
     .setTitle('⚙️伺服器分流及時狀態')
     .addField('**主線分流:** ', `狀態: ${mstate}\n人數: ${mplayercount}\n核心版本: ${mversion}`)

     playerchannel.fetchMessages({around: "660155030015574051", limit: 1})
     .then(msg => {
         const fetchedMsg = msg.first();
         fetchedMsg.edit(Embed);
     })
     });

     
  
  
    }, 15000);




} //結束