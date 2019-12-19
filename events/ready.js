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
        `目前有 ${bot.users.size} 位成員`,
        "夜夜是智障",
        "新毛豆!",
        "我正在監視著你們"


    ] 

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, {type: "PLAYING"})
        bot.user.setStatus('dnd')
    }, 5000)
}