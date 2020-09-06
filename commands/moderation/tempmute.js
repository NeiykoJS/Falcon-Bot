const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");

module.exports = {
    name: "tempmute",
    aliases: ["mute"],
    category: "moderation",
    description: "Tempmute a member",
    usage: "[id | mention]",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

    //!tempmute @user 1s/m/h/d

    const logChannel = message.guild.channels.find(c => c.name === "staff-bot-logs") || message.channel;

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that");
    if(!tomute) return message.reply("I couldn't find the member");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't mute that member");
    let memberrole = message.guild.roles.find(`name`, "Member");
    let notedmemberrole = message.guild.roles.find(`name`, "Noted Member");
    let muterole = message.guild.roles.find(`name`, "Bad Doggo");
    //start of create role
    if(!muterole){
        try{
        muterole = await message.guild.createRole({
            name: "Bad Doggo",
            color: "#070606",
            permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
            });
        });
        }catch(e){
        console.log(e.stack);
        }
    }
  //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time !");
    let reason = args[2];
    if(!reason) return message.reply("You didn't specify a reason !");

    await(tomute.addRole(muterole.id));
    await(tomute.removeRole(memberrole.id));
    await(tomute.removeRole(notedmemberrole.id));
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    const embed = new RichEmbed()
    .setColor("ORANGE")
    .setThumbnail(tomute.user.displayAvatarURL)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(stripIndents`> Muted member : ${tomute} (${tomute.id})
    > Muted by : ${message.member} (${message.member.id})
    > Duration : ${ms(ms(mutetime))}
    > Reason : ${args.slice(2).join(" ")}
    > Channel where the mute took place :
    > ${message.channel}`);

    logChannel.send(embed);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        tomute.addRole(memberrole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
    }

}