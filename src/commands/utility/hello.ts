import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default  {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("挨拶するよ"),
  
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('こんちは');
  }
}