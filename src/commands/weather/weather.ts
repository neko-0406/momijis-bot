import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, type EmbedField } from "discord.js";
import { fetchWeatherData } from "./weatherAPI";

export default {
  data: new SlashCommandBuilder().setName("weather-info").setDescription("現在の仙台の天気を取得します"),

  async execute(interaction: ChatInputCommandInteraction) {
    console.log("called slashcommand: weather-info");
    await interaction.deferReply();

    const response = await fetchWeatherData();
    if (response.status == "ok") {
      const embed1 = new EmbedBuilder()
        .setTitle(`${response.data?.publicTimeFormatted}の天気`)
        .setDescription(`${response.data?.description.bodyText}`);

      const forecasts = response.data?.forecasts;
      const embed2 = new EmbedBuilder()
      
      if (forecasts) {
        let fields: EmbedField[] = [];
        fields = forecasts.map(item => ({
          name: item.dateLabel,
          value: item.telop,
          inline: true
        }))
        embed2.setTitle("数日の天気")
        embed2.addFields(fields)
      } else {
        embed2.setTitle("データの取得に失敗しました")
      }

      await interaction.editReply({ embeds: [embed1, embed2] });
    } else {
      await interaction.editReply("天気情報の取得に失敗しました");
    }
  },
};
