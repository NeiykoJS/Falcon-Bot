module.exports = {
    name: "serverlist",
    category: "info",
    description: "Lists the number of members by rank",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

        message.channel.send(client.guilds.map(r => r.name + ` | **${r.memberCount}** members`))

    }
}