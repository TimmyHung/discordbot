const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const Discord = require("discord.js");
const superagent = require("superagent")
const client = new Discord.Client();
const role = require("../role.json");

const bot = new Discord.Client;
var userTickets = new Map();

module.exports.run = async (bot, message, args) =>{
bot.on("message", async message =>{
    
    let question;
    let askEmbed = new Discord.RichEmbed()
        .setColor(colors.darkblue)
        .setAuthor("問題:", message.guild.iconURL)
        .setDescription(question)
        .setFooter(`PETTW.ONLINE•此為 ${message.author.id} 詢問的問題}`, bot.user.displayAvatarURL);

    if(message.author.bot) return;
    if(message.channel.id === '651080117006762014'){
        message.delete()
        question = args.join(" ")
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
                    .then(() => {
                        channel.send(askEmbed)})
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
            if(message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + 's-ticket')) {
                message.guild.channels.forEach(channel => {
                    if(channel.name.toLowerCase() === message.author.username + 's-ticket') {
                        channel.delete().then(ch => console.log('刪除頻道 ' + ch.id))
                        .catch(err => console.log(err));
                    }
                });
            //小管理判定回復
            
            
            }
        }
    });

}


module.exports.config = {
    //name: "accept",
    //aliases: ["accept"],
    //usage: `${prefix}accept <@用戶>`,
    //description: "審核暱稱時使用",
    //noalias: "無指令縮寫",
    //user: "`DC小管理`"
}