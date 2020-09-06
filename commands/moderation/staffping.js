module.exports = {
    name: "staffping",
    category: "moderation",
    description: "Ping role",
    usage: "[id | mention]",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

        let role = message.guild.roles.find(`name`, `Ping`)

        if(message.member.roles.find(`name`, `Ping`)) {
            message.member.removeRole(role)
            message.channel.send(`**You no longer have the role ${role.name}**`)
        } else {
            message.member.addRole(role)
            message.channel.send(`**You now have the role ${role.name}**`)
        }

    ;}
};