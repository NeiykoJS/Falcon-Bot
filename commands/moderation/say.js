const { RichEmbed } = require(`discord.js`)

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Sending your message through the bot's biai",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
            return message.reply("❌ Error : You don't have permission for that !!")
                .then(m => m.delete(5000));
        }

        if(args.length < 1)
            return message.reply("Nothing to say ?").then(m => m.delete(5000));
        
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
            .setColor(roleColor)
            .setDescription(args.slice(1).join(" "))
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }

    }
}