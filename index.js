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
    let args = messageArray
    let question;
    let asknick;

    if(message.author.bot) return;
    if(message.channel.id === '651080117006762014'){
        asknick = message.member.displayName
        message.delete()
        question = args.join(" ")
        let timmy = message.guild.members.get(role.timmyhung)
        let askEmbed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setAuthor(`${asknick} 問到:`, message.guild.iconURL)
        .setDescription(question)
        .setFooter(`玩家官方協助專區•由 ${timmy.user.tag} 開發`, bot.user.displayAvatarURL);


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
                                id: role.dcadmin
                        }
                    ]
                })

                await channel.setParent('652192577398767639')
                    .then(() => channel.send(askEmbed))  
            }
        
        }
        else if(message.content.toLowerCase() === '!solved') { 
                if (!message.channel.name.startsWith(`問題小房間-${asknick}`)) {
                 return message.delete()
                } else{
                message.channel.delete() 
                    .then(channel => {
                        console.log("刪除小房間 " + channel.name);
                    })
                    .catch(err => console.log(err));
                    }
        }
        if(message.channel.parent_id = '652192577398767639')
            console.log("owo")
            if(message.member.roles.some(r=>[role.dcadmin, role.admin, role.owner].includes(r.name))){
                message.guild.channels.setParent('652192637595680768')
            }
    });



//bot.on("voiceStateUpdate", function(oldMember, newMember){
//    let joinChannel = newMember.voiceChannel
 //   let leaveChannel = oldMember.voiceChannel
//
 //   if(newMember.voiceChannel.id == 630007478008020992)
 //       return newMember.addRole(role.harry)
 //   if(newMember.voiceChannel.id != 630007478008020992)
//        return newMember.addRole(role.harry)
//})


bot.login(process.env.bottoken);
