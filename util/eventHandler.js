const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {
    bot.on("reconnecting", () => reqEvent("reconnecting") (bot))
    bot.on("disconnecting", () => reqEvent("disconnecting") (bot))
    bot.on("warn", reqEvent("warn"))
    bot.on("error", reqEvent("error"))
}
