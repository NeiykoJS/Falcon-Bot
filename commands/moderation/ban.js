const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    aliases: ["hammer"],
    category: "moderation",
    description: "Ban a member",
    usage: "[id | mention]",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "🕵-𝗟𝗼𝗴𝘀-🕵") || message.channel;

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("❌Erreur : Merci de mentionner la cible à bannir 🔨 !!")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return message.reply("❌ Erreur : Merci de spécifier une raison 🔨 !!")
                .then(m => m.delete(5000));
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Erreur : Vous n'avez pas la permission pour bannir ce membre 🔨 !!")
                .then(m => m.delete(5000));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Erreur : Je n'ai pas la permission pour bannir ce membre 🔨 !!")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply("❌ Erreur : je n'ai pas réussi à trouver la cible !!")
                .then(m => m.delete(5000));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("❌ Erreur : Vous ne pouvez pas vous ban vous même !!")
                .then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("❌ Erreur : Je ne peut pas bannir ce membre car sont rôle excède le miens !!")
                .then(m => m.delete(5000));
        }
        
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Membre banni :** ${toBan} (${toBan.id})
            **> Banni par :** ${message.member} (${message.member.id})
            **> Raison :** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`La vérification sera invalide dans 30 secondes !`)
            .setDescription(`Voulez vous vraiment bannir ${toBan} ?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`❌ Erreur : Quelque chose c'est mal passé !! -> ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Bannissement annulé !!`)
                    .then(m => m.delete(10000));
            }
        });
    }
};