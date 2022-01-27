const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const strings = require("../strings.json");

const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('About this bot')

exports.data = data;

exports.sendInfo = async function(interaction) {
    const embed = new MessageEmbed()
        .setTitle("About me")
        .setColor("#47bdff")
        .setDescription(strings.infoMessage);
    await interaction.reply({
        embeds: [embed]
    });
}