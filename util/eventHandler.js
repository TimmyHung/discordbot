const reqEvent = (event) => require(`../events/${event}`)
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = bot => {
    client.on('ready', () => {
    let channel = client.channels.get('656086848627671070');
    //channel = client.channels.find('name', 'Music');

    channel.join()
    .then(connection => console.log('Connected'))
    .catch(console.error);
    
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
})
    

    bot.on("reconnecting", () => reqEvent("reconnecting") (bot))
    bot.on("disconnecting", () => reqEvent("disconnecting") (bot))
    bot.on("warn", reqEvent("warn"))
    bot.on("error", reqEvent("error"))
}
