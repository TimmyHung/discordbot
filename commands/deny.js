const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const ok = "✅";
const no = "❌";

module.exports.run = async (bot, message, args) =>{
    let timmy = message.guild.members.get("490860337302601738")
    let adminchannel = message.guild.channels.get("648476721200496670")

    if(!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(`[錯誤]你的權限不足，如有意願擔任DC小管理盡一份心力，歡迎私訊 ${timmy.user.tag}`)

    if(message.channel.id != 648476721200496670)
        return message.channel.send(`[錯誤]槓你的到正確的頻道使用啦(${adminchannel})`)
    
    let accepter = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!accepter) return message.channel.send("[提示]未知用戶名，請確認你有正確 @用戶，或是 `!!help deny` 查看指令說明")
            .then(() => message.react('❌'))
    
    let reason = args.slice(1).join(" ");
    if(!reason) return message.channel.send("[提示]請輸入原因以利用戶更改錯誤暱稱")
    
    let newbierole = message.guild.roles.get(`616469184905478160`)
    accepter.addRole(newbierole)

    message.delete()
    
    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.red)
    .setAuthor("暱稱審核結果", message.guild.iconURL)
    .addField("申請用戶:", accepter.user.tag)
    .addField("用戶暱稱:", accepter.displayName)
    .addField("審核結果:", "未通過")
    .addField("駁回原因:", reason)
    .setTimestamp()
    .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    accepter.send(pEmbed)

}
module.exports.config = {
    name: "deny",
    aliases: ["deny"],
    usage: `${prefix}deny <@用戶> <原因>`,
    description: "審核暱稱時使用",
    noalias: "無指令縮寫",
    user: "`DC小管理`"
}