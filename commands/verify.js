const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const role = require("../role.json")
const ok = "✅";
const no = "❌";
const client = new Discord.Client();
const dameshin3 = client.emojis.get("658634489517441043");

module.exports.run = async (bot, message, args) =>{

    
    if(message.member.roles.has(role.member))
        return message.channel.send("[錯誤]你已經是正式會員了，沒有必要使用這個指令!").then(m => m.delete(5000))
    if(message.member.roles.has(role.pending))
        return message.channel.send("[錯誤]你的審核要求已送出，重複申請並不會讓你更快通過審核，請耐心等候!").then(m => m.delete(5000));
    let newbierole = message.guild.roles.get(`616469184905478160`)
    let verifier = message.member
    let adminchannel = message.guild.channels.get("648476721200496670")
    let verifychannel = message.guild.channels.get("651796953243320333")

    message.channel.send("[提示]請查看你的私訊").then(m => m.delete(5000));

        //順便發送至DC小管理頻道告知已駁回
        let failEmbed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setAuthor("暱稱審核申請", message.guild.iconURL)
        .addField("申請用戶:", `${verifier.user.tag} (${verifier.user.id})`)
        .addField("申請結果:", "遭到系統自動駁回")
        .setTimestamp()
        .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)


        //自動駁回訊息
        let adEmbed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setAuthor("暱稱審核結果", message.guild.iconURL)
        .addField("申請用戶:", verifier.user.tag)
        .addField("用戶暱稱:", verifier.displayName)
        .addField("審核結果:", "未通過")
        .addField("駁回原因:", "遭到系統自動駁回，請確認你有詳讀伺服器規則")
        .addField("用戶須知:", `請注意，__暱稱不等於帳戶名稱__\n可至${verifychannel}輸入**/nick (暱稱-遊戲ID)**更改\n確認暱稱沒有任何問題後\n可以於相同頻道輸入**!verify**提出申請`)
        .setTimestamp()
        .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)
    
        if(message.member.displayName === "尚未更改暱稱") return verifier.send(adEmbed).then(() => adminchannel.send(failEmbed))

    verifier.removeRole(newbierole)
    verifier.addRole(role.pending)
    message.delete()

    let pEmbed = new Discord.RichEmbed()
    .setColor(colors.white)
    .setAuthor("暱稱審核申請已成功送出", message.guild.iconURL)
    .addField("申請用戶:", verifier.user.tag)
    .addField("用戶暱稱:", verifier.displayName)
    .addField("用戶須知:", "審核將於一天內完成\n還請您耐心等候通知")
    //.setTimestamp()
    //.setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    verifier.send(pEmbed)

    let nickEmbed = new Discord.RichEmbed()
    .setColor(colors.orange)
    .setAuthor("暱稱審核申請", message.guild.iconURL)
    .addField("申請用戶:", `${verifier.user.tag} (${verifier.user.id})`)
    .addField("申請暱稱:", verifier.displayName)
    .addField("審核通過指令:", `${prefix}accept @${verifier.user.tag}`)
    .addField("審核駁回指令:", `${prefix}deny @${verifier.user.tag} <駁回原因>`)
    .setTimestamp()
    .setFooter("PETTW.ONLINE", bot.user.displayAvatarURL)

    adminchannel.send(nickEmbed)
    .then(() => adminchannel.send("貼心的可複製文字:"))
    .then(() => adminchannel.send(`${prefix}accept <@!${verifier.user.id}>`))
    .then(() => adminchannel.send(`${prefix}deny <@!${verifier.user.id}> <駁回原因>`))
    .then(() => adminchannel.send(`不貼心的手動文字(__@!的前面加上加上<__)${dameshin3}`))
    .then(() => adminchannel.send(`${prefix}accept @!${verifier.user.id}>`))
    .then(() => adminchannel.send(`${prefix}deny @!${verifier.user.id}> <駁回原因>`))
}
module.exports.config = {
    name: "verify",
    aliases: ["verify"],
    usage: `${prefix}verify`,
    description: "提出暱稱審核申請",
    noalias: "無指令縮寫",
    user: "`非正式會員`"
}