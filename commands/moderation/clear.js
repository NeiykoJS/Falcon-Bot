module.exports = {
    name: "clear",
    aliases: ["purge", "nuke", "poof"],
    category: "moderation",
    description: "Deletes the number of messages",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ Erreur : Vous n'avez pas la permission pour cela !!")
                .then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("❌ Erreur : Merci de spécifier un nombre au dessus de **0** !!")
                .then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ Erreur : I don't have permission to delete messages !!")
                .then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`\`${deleted.size}\` messages have been deleted !`)).then(m => m.delete(5000))
            .catch(err => message.reply(`❌ Error : Something went wrong -> ${err}`));
    }
}