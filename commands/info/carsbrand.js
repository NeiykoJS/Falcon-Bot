const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "brands",
    aliases: ["brand"],
    category: "info",
    description: "Gives the list of car brands",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

        const embed = new RichEmbed()
        .setColor("ORANGE")
        .addField(`**Brands :**`, stripIndents`***BMW***
        ***Ferrari***
        ***Lexus***
        ***Mazda***
        ***Toyota***
        ***TVR***
        ***Nissan***
        ***Lada***
        ***Pagani***
        ***Kia***`, true)

        .addField(`**Network Solutions**`, stripIndents`***Audi***
        ***Other***
        ***Chevrolet***
        ***Dodge***
        ***Ford***
        ***Mitsubishi***
        ***Mercedes***
        ***Aston Martin***
        ***Jaguar***`, true)

        .setTimestamp()

        message.channel.send(embed);

    }
}