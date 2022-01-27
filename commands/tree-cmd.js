const { SlashCommandBuilder } = require('@discordjs/builders');
const Tree = require("../tree");
const { createCanvas } = require('canvas');
const Tokenizer = require("../tokenizer");
const Parser = require("../parser");
const { MessageAttachment } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName('tree')
    .setDescription('Create a syntax tree.')
    .addStringOption(option =>
        option.setName('notation')
            .setDescription('A tree structure in bracket notation')
            .setRequired(true));

exports.data = data;

exports.sendTree = async function(interaction) {
    const tree = new Tree.Tree();
    const canvas = createCanvas(100, 100);
    const phrase = interaction.options.getString("notation");
    tree.setSubscript(false); // Turn off subscript numbers
    tree.setCanvas(canvas);

    try {
        const tokens = Tokenizer.tokenize(phrase);
        Tokenizer.validateTokens(tokens);

        const syntaxTree = Parser.parse(tokens);
        tree.draw(syntaxTree);
        const imgBuffer = tree.download();
        const attachment = new MessageAttachment(imgBuffer, "syntax_tree.png");
        await interaction.reply({ files: [attachment] });
    } catch (err) {
        await interaction.reply({
            content: "**Error:** " + err,
            ephemeral: true
        });
    }
}