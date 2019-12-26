const Discord = require("discord.js")
const client = new Discord.Client();
const colors = require("../color.json")

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





} //結束