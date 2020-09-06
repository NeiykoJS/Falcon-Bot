module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "info",
    description: "Gives the bot latency and the API latency",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        const msg = await message.channel.send(`Pinging...`)
        
        msg.edit(`Pong\nLatency : ${Math.floor(msg.createdAt - message.createdAt)}ms\n API Latency : ${Math.round(client.ping)}ms`);
    }
}