const { RichEmbed } = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync(__dirname + `/warnings.json`, "utf8"));

module.exports = {
    name: "warn",
    category: "moderation",
    description: "warn a member",
    usage: "[id | mention]",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

    //!warn @joueur [raison]
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Sorry you can't do that !!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("I couldn't find the player");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't warn this player");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("WARNING")
    .setColor("#15f153")
    .addField("Player :", `${message.mentions.users.first()}`)
    .addField("Number of Warnings :", warns[wUser.id].warns)
    .addField("Reason :", reason)
    .setFooter("Network Solutions | Redline Drifting");

    let warnchannel = message.guild.channels.find(`name`, "staff-bot-logs");
    if(!warnchannel) return message.reply("I didn't find the channel");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 1) {
        try{
        await wUser.send(`You were warned for the first time\
        Reason : ${reason}
        Stay calm to avoid future additional warnings`)
        }catch(e){
        message.channel.send(`I tried to dm it but it blocked them`)
        }
    }

    if(warns[wUser.id].warns == 2) {
        try{
            await wUser.send(`You were warned for the second time\n
            Reason : ${reason}\n
            Next time it's a kick.`)
        }catch(e){
        message.channel.send(`I tried to dm it but it blocked them`)
        }
    };

    if(warns[wUser.id].warns == 3) {
        try{
            await wUser.send(`You've been warned for the third time\n
            Reason : ${reason}\n
            You've just been expelled from the discord`)
        }catch(e){
            message.channel.send(`<@${wUser.id}> was kick\n
            I tried to dm it but it blocked them`)
        }
        message.guild.member(wUser).kick(reason);
    }

    if(warns[wUser.id].warns == 4) {
        try{
        wUser.send(`You've been warned for the fourth time, it's too much !!!\n
        Reason : ${reason}\n
        You have just been banned from the server for any explanation dm a member of the staff`)
        }catch(e){
            message.channel.send(`<@${wUser.id}> was ban\n
            I tried to dm it but it blocked them`)
        }
        message.guild.member(wUser).ban(reason);
    }

    message.delete().catch(O_o=>{});

    message.channel.send(`The warning has been applied to the player <@${wUser.id}>`)

    }
}