const { Client, Intents, MessageAttachment, MessageEmbed, SnowflakeUtil } = require("discord.js");
const config = require("./config");
const Parser = require("./parser");
const Tokenizer = require("./tokenizer");
const Tree = require("./tree");
const { createCanvas } = require('canvas');
const canvas = createCanvas(100, 100);
const strings = require("./strings.json");
const helpCmd = require("./commands/help");
const treeCmd = require("./commands/tree-cmd");

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

    switch (command) {
        case "tree":
            const phrase = args.join(' ');
            sendTree(message, phrase);
            break;
        case "help":
            sendHelp(message);
            break;
    }
});

client.on("ready", function () {
    client.user.setPresence({
        status: "online",
        activity: {
            name: "!help for info",
            type: "PLAYING"
        }
    });
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "help":
            await helpCmd.sendHelp(interaction);
            break;
        case "tree":
            await treeCmd.sendTree(interaction);
            break;
    }
});

function sendTree(message, phrase) {
    const tree = new Tree.Tree();
    tree.setSubscript(false); // Turn off subscript numbers
    tree.setCanvas(canvas);

    try {
        const tokens = Tokenizer.tokenize(phrase);
        Tokenizer.validateTokens(tokens);

        const syntaxTree = Parser.parse(tokens);
        tree.draw(syntaxTree);
        const imgBuffer = tree.download();
        const attachment = new MessageAttachment(imgBuffer, "syntax_tree.png");
        message.channel.send({ files: [attachment] });
    } catch (err) {
        message.channel.send(err);
    }
}

function sendHelp(message) {
    const embed = new MessageEmbed()
        .setTitle("How I work")
        .setColor("#47bdff")
        .setDescription(strings.helpMessage);
    message.channel.send({ embeds: [embed] });
}

client.login(config.BOT_TOKEN);
