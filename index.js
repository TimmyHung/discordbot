const botconfig = require("./botconfig.json");
const colors = require("./color.json");
const Discord = require("discord.js");
const superagent = require("superagent")
const client = new Discord.Client();
const role = require("./role.json");

const bot = new Discord.Client({disableEveryone: true});
var userTickets = new Map();

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

    if(message.author.bot) return;
    if(message.channel.id === '651080117006762014'){
        message.delete()
        question = args.join(" ")
        let timmy = message.guild.members.get(role.timmyhung)
        let askEmbed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setAuthor(`${message.author.username} 問到:`, message.guild.iconURL)
        .setDescription(question)
        .setFooter(`伺服器玩家協助•由 ${timmy} 開發`, bot.user.displayAvatarURL);


        if(userTickets.has(message.author.id) || message.guild.channels.some(channel =>
            channel.name.toLowerCase() === message.author.id + '-問題小房間')) {
                message.channel.send("[錯誤]你已經有一間問題小房間了!").then(m => m.delete(5000))
            }
            else {
                let guild = message.guild;
                const channel = await guild.createChannel(`${message.author.username}-問題小房間`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                                allow: 'VIEW_CHANNEL',
                                id: message.author.id
                        },
                        {
                                deny: 'VIEW_CHANNEL',
                                id: guild.id
                        }
                    ]
                })

                await channel.setParent('652192577398767639')
                    .then(() => channel.send(askEmbed))
                    .then(ch => {
                    userTickets.set(message.author.id, ch.id); // Once our channel is created, we set the map with a key-value pair where we map the user's id to their ticket's channel id, indicating that they have a ticket opened.
                }).catch(err => console.log(err));
            }
        }
        else if(message.content.toLowerCase() === '!!solved') { // Closing the ticket.
            if(userTickets.has(message.author.id)) { // Check if the user has a ticket by checking if the map has their ID as a key.
                if(message.channel.id === userTickets.get(message.author.id)) {
                    message.channel.delete('closing ticket') // Delete the ticket.
                    .then(channel => {
                        console.log("刪除頻道 " + channel.name);
                        userTickets.delete(message.author.id);
                    })
                    .catch(err => console.log(err));
                }
            }
            /** 
             * Here we will check the server to see if there were additional tickets created that the bot may have missed due to 
             * either crashing, restarting, etc.. This part will delete ALL of the tickets that follow the format of 
             * "<username>s-ticket" because that was the way we hard-coded. You can modify this obviously.
             */
            if(message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + '-問題小房間')) {
                message.guild.channels.forEach(channel => {
                    if(channel.name.toLowerCase() === message.author.username + '-問題小房間') {
                        channel.delete().then(ch => console.log('刪除頻道 ' + ch.id))
                        userTickets.delete(message.author.id)
                        .catch(err => console.log(err));
                    }
                });
            //小管理判定回復
            
            
            }
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
