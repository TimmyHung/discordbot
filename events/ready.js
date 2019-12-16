const Discord = require("discord.js")
const client = new Discord.Client();


module.exports = bot => {
    console.log(`${bot.user.username} 已上線!`)
    //bot.user.setActivity("智障獨角獸", {type: "WATCHING"})

    //let channel = client.channels.get('656086848627671070');
    //if (!channel) return console.error("指揮中心頻道不存在");
    //channel.join().then(connection => {
    //  console.log("已進入指揮中心!");
    //}).catch(e => {
    //  console.error(e);
    //})


    let statuses = [
        "PETTW.ONLINE",
        "P.E.T伺服器",
        "!!help 查看指令幫助",
        `目前有 ${bot.users.size} 位成員`,
        "獨角獸都智障 乾! ",
        "你全家都毛豆 乾!",
        "MiMu!!"


    ] 

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, {type: "PLAYING"})
    }, 5000)
}