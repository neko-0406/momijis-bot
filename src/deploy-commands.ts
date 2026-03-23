import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
// config.json を読み込む
import { client_id, test_server_id, token } from '../bot_config.json';

const commands = [];
// Bunでは __dirname の代わりに import.meta.dir を使うと現在のフォルダのパスが取れます
const foldersPath = path.join(import.meta.dir, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  
  // フォルダじゃないもの（直接置かれたファイルなど）はスキップする安全対策
  if (!fs.statSync(commandsPath).isDirectory()) continue;

  // .ts ファイルだけを抽出
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    
    // TypeScript/ESモジュールでは require() ではなく await import() を使います
    const commandModule = await import(filePath);
    
    // export default で出力している場合への対応
    const command = commandModule.default ? commandModule.default : commandModule;

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] ${filePath} に必要な "data" か "execute" がありません。`);
    }
  }
}

// RESTモジュールの準備
const rest = new REST().setToken(token);

// コマンドのデプロイ（登録）を実行
(async () => {
  try {
    console.log(`${commands.length} 個のアプリケーション (/) コマンドを更新中...`);

    // 特定のサーバー(guildId)専用コマンドとして登録します
    const data: any = await rest.put(
      Routes.applicationGuildCommands(client_id, test_server_id),
      { body: commands }
    );

    console.log(`${data.length} 個のアプリケーション (/) コマンドの登録に成功しました！`);
  } catch (error) {
    console.error('コマンド登録中にエラーが発生しました:', error);
  }
})();