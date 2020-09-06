const { getMember, formatDate } = require(`../../functions.js`);
const { RichEmbed } = require('discord.js')
const { stripIndents } = require("common-tags");

module.exports = {

    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Provides member information",
    usage: "[username | id, | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        //Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        //User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField(`Member Information`, stripIndents`**> Current username :** ${member.displayName}
            **> Join us on :** ${joined}
            **> Roles :** ${roles}`, true)

            .addField(`Member Information`, stripIndents`**> ID :** ${member.user.id}
            **> Username :** ${member.user.username}
            **> Discord TAG :** ${member.user.tag}
            **> Created on :** ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField(`Game`, `**> Currently playing :** ${member.user.presence.game.name}`)

            message.channel.send(embed);
    }
}