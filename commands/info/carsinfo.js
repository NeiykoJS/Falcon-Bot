const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "cars",
    aliases: ["car"],
    category: "info",
    description: "Gives information about the cars",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

        if(args.length < 1)
            return message.reply("Try **<,cars brand**> you can try ,brand to see the list of cars brands").then(m => m.delete(10000));

        //Début de la marque BMW
        if (args[0].toLowerCase() === "bmw") {
            const promptEmbedbmw = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("You have 30 seconds to react")
                .setDescription("1️⃣ **m3 e36** | 2️⃣ **m2** | 3️⃣ **m3 e30** | 4️⃣ **z4** | 5️⃣ **m4 cs** | 6️⃣ **m3 E92**")

        //Send the message
        await message.channel.send(promptEmbedbmw).then(async msg => {
            //Await the reactions and the reactioncollector
            let emoji = await promptMessage(msg, message.author, 30, ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"]);

            //Verifiction stuffs
            if (emoji === "1️⃣") {
                msg.delete();

                const bmw1 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW m3 e36")
                .setDescription("The price of this car is : **251 000 $**")

                message.channel.send(bmw1);
                

            } else if (emoji === "2️⃣") {
                msg.delete();

                const bmw2 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW m2")
                .setDescription("The price of this car is : **245 000 $**")

                message.channel.send(bmw2);
            } else if (emoji === "3️⃣") {
                msg.delete();

                const bmw3 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW m3 e30")
                .setDescription("The price of this car is : **161 000 $**")

                message.channel.send(bmw3);
            } else if (emoji === "4️⃣") {
                msg.delete();

                const bmw4 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW z4")
                .setDescription("The price of this car is : **78 500 $**")

                message.channel.send(bmw4);
            } else if (emoji === "5️⃣") {
                msg.delete();

                const bmw5 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW m4 cs")
                .setDescription("The price of this car is : **420 000 $**")

                message.channel.send(bmw5);
            } else if (emoji === "6️⃣") {
                msg.delete();

                const bmw6 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW m3 E92")
                .setDescription("The price of this car is : **392 000 $**")

                message.channel.send(bmw6);
            } else if (emoji === "7️⃣") {
                msg.delete();

                const bmw7 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("BMW")
                .setDescription("The price of this car is : **price**")
            }
        })    
        };
        //Fin de la marque BMW
        //Début du la marque Jaguar
        if (args[0].toLowerCase() === "jaguar") {
            const promptEmbedjaguar = new RichEmbed()
            .setColor("ORANGE")
            .setAuthor("You have 30 seconds to react")
            .setDescription("1️⃣ **F-Type**")

            //Send the message
            await message.channel.send(promptEmbedjaguar).then(async msg => {
                //Await the reactions and the reactioncollector
                let emoji = await promptMessage(msg, message.author, 30, ["1️⃣"])
            //Verification stuffs
            if(emoji === "1️⃣") {
                msg.delete()

                const jaguar1 = new RichEmbed()
                .setColor("ORANGE")
                .setAuthor("Jaguar F-Type")
                .setDescription("The price of this car is : **296 000 $**")

                message.channel.send(jaguar1);
            }
        })
    }
    //Fin de la marque Jaguar
    //Début de la marque Aston Martin
    if (args[0].toLowerCase() === "aston") {
    if (args[1].toLowerCase() === "martin") {
        const promptEmbedaston = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("You have 30 seconds to react")
        .setDescription("1️⃣ **Vantage V12**")

        //Send the message
        await message.channel.send(promptEmbedaston).then(async msg => {
            //Await the reactions and the reactioncollector
            let emoji = await promptMessage(msg, message.author, 30, ["1️⃣"])
        //Verification stuffs
        if(emoji === "1️⃣") {
            msg.delete();

            const aston1 = new RichEmbed()
            .setColor("ORANGE")
            .setAuthor("Aston Martin Vantage V12")
            .setDescription("The price of this car is : **212 000 $**")

            message.channel.send(aston1);
        }
        })
    }
}
    //Fin de la marque Aston Martin
    //Début de la marque Mercedes
    if(args[0].toLowerCase === "mercedes") {
        const promptEmbedmercedes = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("You have 30 seconds to react")
        .setDescription("1️⃣ **C63s AMG")

    //Send the message
    await message.channel.send(promptEmbedmercedes).then(async msg => {
        //Await the reactions and the reactioncollector
        let emoji = await promptMessage(msg, message.author, 30, ["1️⃣"])
    //Verifiction stuffs
    if (emoji === "1️⃣") {
        msg.delete();

        const mercedes1 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Mercedes C63s AMG")
        .setDescription("The price of this car is : **363 000 $**")

        message.channel.send(mercedes1);
    }

    })    
    }
    //Fin de la marque Mercedes
    //Début de la marque Mitsubishi
    if(args[0].toLowerCase() === "mitsubishi") {
        const promptEmbedmitsubishi = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("You have 30 seconds to react")
        .setDescription("1️⃣ **Lancer EVO 9**")

    //Send the message
    await message.channel.send(promptEmbedmitsubishi).then(async msg => {
        //Await the reactions and the reactioncollector
        let emoji = await promptMessage(msg, message.author, 30, ["1️⃣"])
    //Verifiction stuffs
    if (emoji === "1️⃣") {
        msg.delete();

        const mitsubishi1 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Mitsubishi Lancer EVO 9")
        .setDescription("The price of this car is : **170 000 $**")

        message.channel.send(mitsubishi1);
    }
    })
    }
    //Fin de la marque Mitsubishi
    //Début de la marque Ford
    if (args[0].toLowerCase() === "ford") {
        const promptEmbedford = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("You have 30 seconds to react")
        .setDescription("1️⃣ **Mustang Widebody** | 2️⃣ **Mustang**")

    //Send the message
    await message.channel.send(promptEmbedford).then(async msg => {
        //Await the reactions and the reactioncollector
        let emoji = await promptMessage(msg, message.author, 30, ["1️⃣", "2️⃣"])
    //Verification stuffs
    if (emoji === "1️⃣") {
        msg.delete();

        const ford1 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Ford Mustang Widebody")
        .setDescription("The price of this car is : **IDK $**")

        message.channel.send(ford1);
    }
    if (emoji === "2️⃣") {
        msg.delete();

        const ford2 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Ford Mustang")
        .setDescription("The price of this car is : **193 450 $**")

        message.channel.send(ford2);
    }
    })
    }
    //Fin de la marque Ford
    //Début de la marque Dodge
    if (args[0].toLowerCase() === "dodge") {
        const promptEmbeddodge = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("You have 30 seconds to react")
        .setDescription("1️⃣ **Viper SRT** | 2️⃣ **RAM**")

    //Send the message
    await message.channel.send(promptEmbeddodge).then(async msg => {
        //Await the reactions and the reactioncollector
        let emoji = await promptMessage(msg, message.author, 30, ["1️⃣", "2️⃣"])
    //Verification stuffs
    if (emoji === "1️⃣") {
        msg.delete();

        const dodge1 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Dodge Viper SRT")
        .setDescription("The price of this car is : **395 000 $**")

        message.channel.send(dodge1);
    }
    if (emoji === "2️⃣") {
        msg.delete();

        const dodge2 = new RichEmbed()
        .setColor("ORANGE")
        .setAuthor("Dodge RAM")
        .setDescription("The price of this car is : **150 000 $**")

        message.channel.send(dodge2);
    }
    })
    }
    //Fin de la marque Dodge
    //Début de la marque 
}
};