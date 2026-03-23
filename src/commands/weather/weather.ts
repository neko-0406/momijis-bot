import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { fetchWeatherData } from "./weatherAPI";

export default {
  data: new SlashCommandBuilder().setName("weather-info").setDescription("現在の仙台の天気を取得します"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const response = await fetchWeatherData();
    if (response.status == "ok") {
      const forecast = response.data?.forecasts.find((item) => item.dateLabel === "今日");
      const embed = new EmbedBuilder()
        .setTitle(`${response.data?.publicTimeFormatted}の天気`)
        .setDescription(`${response.data?.description.bodyText}`);
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply("天気情報の取得に失敗しました");
    }
  },
};
