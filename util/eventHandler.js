const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {
    bot.on('ready', () => {
    console.log(`${bot.user.username} 已上線!`)

    let channel = bot.channels.get('656086848627671070');
      
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
