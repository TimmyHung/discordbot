const Discord = require("discord.js")
const prefix = require("../botconfig.json")

module.exports = bot => {
    console.log(`${bot.user.username} 已斷線於 ${new Date()}!`)
}