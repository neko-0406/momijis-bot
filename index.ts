import { Client, GatewayIntentBits } from "discord.js";
import config from "./bot_config.json";

const intents = [
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages
]

const client = new Client({ intents: intents });

client.on('clientReady', event => {
  console.log("bot is ready...");
  console.log(event.user.displayName);
})

client.login(config.token);

