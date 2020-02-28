const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const prefix = botconfig.prefix
const role = require("../role.json");

module.exports.run = async (bot, message, args) =>{
    let timmy = message.guild.members.get('490860337302601738');
    let vipchannel = message.guild.channels.get('649290903449632791');

    if(!message.member.roles.has(role.admin)) return;
    message.delete();
    let mChannel = message.mentions.channels.first()
    let avataruser = message.mentions.members.first() || message.guild.members.get(args[0])
    
    if(!avataruser){
        message.channel.send("[錯誤]請標記一位用戶")
    }
    let cEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setAuthor(`用戶 ${avataruser.displayName} 的頭貼:`, message.guild.iconURL)
        .setImage(avataruser.user.displayAvatarURL)
        .setTimestamp()
        .setFooter(`PETTW.ONLINE • 由 ${timmy.user.tag} 開發 `, timmy.displayAvatarURL)

        if(mChannel){
            mChannel.send(cEmbed)
        }
        if(!mChannel && avataruser){
        vipchannel.send(cEmbed)
        }

}

module.exports.config = {
    name: "avatar",
    aliases: ["avatar"],
    usage: `${prefix}avatar <@用戶>`,
    description: "查看某用戶的頭貼",
    noalias: "無指令縮寫",
    user: "`全能管理`"
}