const { Client, Intents } = require("discord.js");
const config = require("./config");
const helpCmd = require("./commands/help");
const treeCmd = require("./commands/tree-cmd");
const infoCmd = require("./commands/info");

const intents = new Intents();
intents.add([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]);
const client = new Client({ intents: intents });
const PREFIX = "!";

client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const commandBody = message.content.slice(PREFIX.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const commands = ["tree", "help", "info"];
    if (commands.includes(command)) {
        message.channel.send(`This bot now uses slash commands. Please use /${command}`);
    }
});

client.on("ready", function () {
    client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "/help for info",
                type: "PLAYING"
            }
        ]
    });
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "help":
            await helpCmd.sendHelp(interaction);
            break;
        case "info":
            await infoCmd.sendInfo(interaction);
            break;
        case "tree":
            await treeCmd.sendTree(interaction);
            break;
    }
});

client.login(config.BOT_TOKEN);
