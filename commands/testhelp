const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../color.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) =>{
    let pages = ['blablabla', '看屁喔', '第三頁在這', '你484智障', '說阿!', '智障獨角獸!'];
    let page = 1;

    const embed = new Discord.RichEmbed()
        .setColor(colors.gold)
        .setFooter(`目前頁數: ${page} / ${pages.length}`)
        .setDescription(pages[page-1])
    message.channel.send(embed).then(msg => {

        msg.react('⏪').then( r => {
            msg.react('⏩')

            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`目前頁數: ${page} / ${pages.length}`)
                msg.edit(embed)
            })
            
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page-1]);
                embed.setFooter(`目前頁數: ${page} / ${pages.length}`)
                msg.edit(embed)
            })
        
        })
    })
    

        
        
        
        //if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("我把拔還沒把我設定好，你別想叫我做事!");
    
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
    name: "helptest",
    //aliases: ["help", "commands"],
    usage: `${prefix}helptest <指令名稱>`,
    description: "列出所有可用的指令或是查詢單一指令用法",
    noalias: "無指令縮寫"
    //user: "管理員"
}