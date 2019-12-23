const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{
    if(args[0]){
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setAuthor("P.E.T伺服器指令介紹", message.guild.iconURL)
            .setColor(colors.black)
            .setDescription(`**BOT指令前綴:** ${prefix}\n\n**查詢指令:** ${command.config.name}\n**使用方式:** ${command.config.usage  || "無"}\n**指令別名: **${command.config.noalias || command.config.aliases}\n**指令介紹:** ${command.config.description || "無"}\n**適用對象:** ${command.config.user || "`每一個人`"}`)
            .setTimestamp()
            .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)
            message.channel.send(SHembed);
        }}
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("我把拔還沒把我設定好，你別想叫我做事!");
    
    if(!args[0]){
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor("指令幫助:", message.guild.iconURL)
        .setColor(colors.blue)
        .setDescription(`${message.author.username} 查看你的私訊`)

        let sEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setAuthor(`P.E.T伺服器BOT指令使用幫助`)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .setDescription(`以下是我可以使用的指令\n使用方式: ${prefix}指令`)
        .addField(`指令:`, "``userinfo`` ``mimu``")
        .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(3000));
        message.author.send(sEmbed)

    }
}

module.exports.config = {
    name: "help",
    aliases: ["help", "commands"],
    usage: `${prefix}help <指令名稱>`,
    description: "列出所有可用的指令或是查詢單一指令用法",
    noalias: "無指令縮寫"
    //user: "管理員"
}