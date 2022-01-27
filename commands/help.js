const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const strings = require("../strings.json");

const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('How to use this bot.')

exports.data = data;

exports.sendHelp = async function(interaction) {
    const embed = new MessageEmbed()
        .setTitle("How I work")
        .setColor("#47bdff")
        .setDescription(strings.helpMessage);
    await interaction.reply({
        embeds: [embed]
    });
}