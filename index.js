const botconfig = require("./botconfig.json");
const colors = require("./color.json");
const Discord = require("discord.js");
const superagent = require("superagent")
const client = new Discord.Client();
const role = require("./role.json");

const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("[警告]找不到任何指令!")
    }

    jsfile.forEach((f, i) =>{
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});


bot.on("guildMemberAdd", member => {
    let timmy = bot.users.get(role.timmyhung)
    let channel = bot.channels.get('617046297907560551')
    let rchannel = bot.channels.get('651796953243320333')
    let lchannel = bot.channels.get('651080117006762014')

    let JemBed = new Discord.RichEmbed()
    .setColor(colors.green)
    .setAuthor(`歡迎加入 P.E.T伺服器 Discord 群組`)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`新成員: <@!${member.id}> \n\n 目前所有頻道皆處於上鎖狀態 \n\n 請先至 ${rchannel} 閱讀規則 \n\n 並依照指示開啟 Discord 功能 \n\n 如果有任何疑問 歡迎使用 ${lchannel}`)
    .setFooter(`PETTW.ONLINE•由 ${timmy.tag} 開發`)
    

    channel.send(JemBed)
    .then(() => member.setNickname("尚未更改暱稱"))

});


bot.on("message", async message =>{
    if(message.author.bot || message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot, message, args)

});

bot.on("message", async message =>{
    let messageArray = message.content.split(" ")
    let timmy = message.guild.members.get("490860337302601738")
    let args = messageArray
    let logchannel = message.guild.channels.get("652930636570689576")
    let question;
    let asknick;

    if(message.author.bot) return;
    if(message.channel.id === '651080117006762014'){
        asknick = message.member.displayName
        message.delete()
        question = args.join(" ")
        let askChannel = message.guild.channels.get("651080117006762014")
        let askEmbed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setAuthor(`${asknick} 問到:`, message.author.displayAvatarURL)
        .setDescription(question)
        .addField("小提醒:", "此頻道只有你和問題回覆助手可以看到\n盡可能的詳細描述你的問題，我們會在最短的時間內回覆。\n如果問題解決了請輸入 !solved")
        .setFooter(`玩家&官方協助專區•由 ${timmy.user.tag} 開發`, bot.user.displayAvatarURL);

        let logEmbed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setAuthor(`${asknick} 問到:`, message.author.displayAvatarURL)
        .setDescription(question)
        .addField("詢問日期:", message.createdAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
        .setFooter(`玩家&官方協助專區•由 ${timmy.user.tag} 開發`, bot.user.displayAvatarURL)

        if(message.member.roles.has(role.helper))
        return message.channel.send(`[錯誤]你是回覆助手應該直接找 ${timmy.user.tag} 解決問題`).then(m => m.delete(3000))
        if(message.guild.channels.some(channel =>
            channel.name.toLowerCase() === '問題小房間-' + asknick)) {
                message.channel.send("[錯誤]你已經有一間問題小房間了").then(m => m.delete(5000))
            }
            else {
                let guild = message.guild;
                const channel = await guild.createChannel(`問題小房間-${asknick}`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                                allow: 'VIEW_CHANNEL',
                                id: message.author.id
                        },
                        {
                                deny: 'VIEW_CHANNEL',
                                id: guild.id
                        },
                        {
                                allow: 'VIEW_CHANNEL',
                                id: role.helper
                        }
                    ]
                })

                await channel.setParent('652192577398767639')
                    .then(() => channel.send(askEmbed)) 
                    .then(() => channel.setTopic('此頻道只有你和問題回覆助手可以看到\n盡可能的詳細描述你的問題，我們會在最短的時間內回覆。\n如果問題解決了請輸入 !solved'))
                    .then(() => logchannel.send(logEmbed))
                    askChannel.send(`[提示]問題小房間創建成功(${channel})`).then(m => m.delete(10000))
            }
        
        }
        else if(message.content.toLowerCase() === '!solved') { 
                if (!message.channel.name.startsWith(`問題小房間-`)) {
                 return;
                } else{
                message.channel.delete() 
                    .then(channel => {
                        console.log("刪除頻道 " + channel.name);
                    })
                    .catch(err => console.log(err));
                    }
        }
        if(message.channel.parentID == '652192577398767639' && message.member.roles.has(role.helper))
            message.channel.setParent('652192637595680768')
        if(message.channel.parentID == '652192637595680768' && !message.member.roles.has(role.helper))
            message.channel.setParent('652192577398767639')
    });



bot.on("voiceStateUpdate", function(oldMember, newMember){
    let joinChannel = newMember.voiceChannel
    let leaveChannel = oldMember.voiceChannel
    
    if(joinChannel == undefined){
     return newMember.removeRole(role.harry)
    
    }else if(joinChannel.id == '630007478008020992'){
        return newMember.addRole(role.harry)
    }else{
        newMember.removeRole(role.harry)
    }
    
})

    //bot.on("message", async message =>{
    //    if(message.member.roles.has(role.wanted))
    //    message.react('😡')
    //})


bot.login(process.env.bottoken);
