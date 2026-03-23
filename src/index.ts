import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import fs from "node:fs"
import path from "node:path"
import config from "../bot_config.json";

const intents = [
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages,
]

const client = new Client({ intents: intents });
const commands = new Collection<string, any>();

const foldersPath = path.join(import.meta.dir, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  
  if (!fs.statSync(commandsPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    
    const commandModule = await import(filePath);
    const command = commandModule.default ? commandModule.default : commandModule;

    if ('data' in command && 'execute' in command) {
      // コマンド名をキーにして、コマンドの処理全体を保存する
      commands.set(command.data.name, command);
      console.log(`コマンド：${command.data.name}を登録しました`)
    } else {
      continue;
    }
  }
}

client.on('clientReady', event => {
  console.log("bot is ready...");
  console.log(event.user.displayName);
})

client.on(Events.InteractionCreate, async interaction => {
  // チャットに入力されたスラッシュコマンド以外は無視する
  if (!interaction.isChatInputCommand()) return;

  // ユーザーが打ったコマンド名（例: 'hello'）を使って、辞書から該当する処理を探す
  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`⚠️ ${interaction.commandName} というコマンドは見つかりません。`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    const errorMessage = { content: 'コマンド実行中にエラーが発生しました！', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

client.login(config.token);

