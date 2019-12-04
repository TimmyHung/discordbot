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

bot.on("voiceStateUpdate", function(oldMember, newMember){
    let joinChannel = newMember.voiceChannel
    let leaveChannel = oldMember.voiceChannel

    if(newMember.voiceChannel.id == 630007478008020992)
        return newMember.addRole(role.harry)
    if(newMember.voiceChannel.id != 630007478008020992){
        return newMember.removeRole(role.harry)
    } else if(newUserChannel === undefined)
        return newMember.removeRole(role.harry)
})


bot.login(process.env.bottoken);
