console.clear();
const { Client, Collection, GatewayIntentBits, Partials, Options } = require("discord.js");
require("colors");
const fs = require("node:fs");
const TOKEN = require('./config.json').TOKEN;
const { initializeMongoose } = require('./database/mongoose')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember
  ],
  makeCache:
    Options.cacheWithLimits({
      ...Options.DefaultMakeCacheSettings,
      GuildMemberManager: {
        maxSize: 200,
        keepOverLimit: member => member.id === client.user.id
      },
    }),
  sweepers: {
    ...Options.DefaultSweeperSettings,
    messages: {
      interval: 3600,
      lifetime: 604800000,
    },
  },
  allowedMentions: {
    parse: [
      "users",
      "roles"
    ],
    repliedUser: true
  },
});

client.interactions = new Collection();
client.cooldowns = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.dev = new Collection();

module.exports = client;

const folders = fs.readdirSync("./Handlers");
for (const folder of folders) {
  const files = fs.readdirSync(`./Handlers/${folder}`).filter((file) => file.endsWith(".js"));
  for (const file of files) {
    require(`./Handlers/${folder}/${file}`)(client);
  }
}

(async () =>{
  await initializeMongoose()
  await client.login(TOKEN)
})()
