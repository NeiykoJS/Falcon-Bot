const { RichEmbed } = require(`discord.js`)
const { stripIndents } = require(`common-tags`);
const { promptMessage } = require(`../../functions.js`);

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick a member",
    usage: "[id | mention]",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "staff-bot-logs") || message.channel;

        if (message.deletable) message.delete();

        //No args
        if (!args[0]) {
            return message.reply(`❌ Error : Please mention the player to be kick 🔨 !!`)
                .then(m => m.delete(5000));
        }

        //No reason
        if (!args[1]) {
            return message.reply(`❌ Error : Please specify the reason 🔨 !!`)
                .then(m => m.delete(5000));
        }

        //No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Error : You don't have permission to kick that player 🔨 !!")
                .then(m => m.delete(5000))
        }

        //No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Error : I don't have permission to kick this player 🔨 !!")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        //No member found
        if (!toKick) {
            return message.reply("❌ Error : I couldn't find the member !!")
                .then(m => m.delete(5000));
        }

        // Can't kick urself
        if(message.author.id === toKick.id) {
            return message.reply("❌ Error : You can't kick yourself !!")
                .then(m => m.delete(5000));
        }

        // Kickable
        if (!toKick.kickable) {
            return message.reply("❌ Error : I can't kick this person because his role is above my own !!")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Kick member :** ${toKick} (${toKick.id})
            **> Kicked by :** ${message.author} (${message.author.id})
            **> Reason :** 
            > ${args.slice(1).join(" ")}`)

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor("Verification will be invalid after 30 seconds")
            .setDescription(`Do you really want to kick ${toKick} ?`);

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`❌ Error : Something went wrong !!`);
                    });

                    logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply("Kick cancelled !!")
                    .then(m => m.delete(5000));
            }
        });
    }
}