const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{
    if(!message.memeber.roles.has(role.admin)){
    }else return message.channel.send("[錯誤]權限不足")
    if(args[0]){
        let plugin = args[0];
        if(bot.plugins.has(plugin)){
            plugin = bot.plugins.get(plugin);
            var SHembed = new Discord.RichEmbed()
            .setAuthor("Minecraft插件指令幫助:", message.guild.iconURL)
            .setColor(colors.black)
            .setDescription(`**查詢插件:** ${plugin.pluginhelp.name}\n**常用指令列表與說明:** ${plugin.pluginhelp.info}`)
            .setTimestamp()
            .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)
            message.delete();
            message.channel.send(SHembed);
        }}

    if(!args[0]){
        message.delete();
        message.channel.send("[錯誤]未知的插件名稱或是尚未登記至資料庫內").then(m => m.delete(3000));

    }
}

module.exports.config = {
    name: "phelp",
    aliases: ["ph"],
    usage: `${prefix}phelp <插件名稱>`,
    description: "查詢已登記的插件指令",
    noalias: "無指令縮寫",
    user: "`全能管理`"
}