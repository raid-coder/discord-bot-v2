const {
  Client,
  IntentsBitField,
  InteractionCollector,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { CommandKit } = require("commandkit");
require("dotenv/config");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  bulkRegister: true,
});

const prifix = ">";
client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prifix) || msg.author.bot) return;

  const args = msg.content.slice(prifix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //message array
  const messageArray = msg.content.split(" ");
  const arg = messageArray.slice(1);
  const cmd = messageArray[0];
  // commands

  // regular commands
  if (command === "hey") {
    msg.channel.send("hey there! Little Candy in your service🍬");
  }
  if (command === "candy") {
    msg.channel.send("here's a candy for you 🍬");
  }

  //ban command
  if (command === "ban") {
    const member =
      msg.mentions.members.first() ||
      msg.guild.members.cache.get(args[0]) ||
      msg.guild.members.cache.find(
        (x) =>
          x.user.username.toLowerCase() ===
          args.join(" " || x.username === args[0])
      );
    if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return msg.channel.send("You don't have permission to ban members");
    if (!member) return msg.channel.send("Please mention a user");
    if (msg.member === member)
      return msg.channel.send("You can't ban yourself");
    if (!member.kickable) return msg.channel.send("I can't ban that member");

    let reason = args.slice(1).join(" ") || "No reason given";
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        `:white_check_mark: **${member.user.tag} has been banned for ${reason}**`
      );
    const dmembed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        `:x: **You were banned from ${msg.guild.name} by ${msg.author.tag} for ${reason}**`
      );
    member.send({ embeds: [dmembed] }).catch((err) => {
      console.log(`${member.user.tag} was not banned due to ${err}`);
    });
    member.ban().catch((err) => {
      msg.channel.send(`${member.user.tag} was not banned due to ${err}`);
    });
    msg.channel.send({ embeds: [embed] });
  }
    //kick command
if (command === "kick") {
  const member =
    msg.mentions.members.first() ||
    msg.guild.members.cache.get(args[0]) ||
    msg.guild.members.cache.find(
      (x) =>
        x.user.username.toLowerCase() ===
        args.join(" " || x.username === args[0])
    );
  if (!msg.member.permissions.has(PermissionsBitField.Flags.KickMembers))
    return msg.channel.send("You don't have permission to kick members");
  if (!member) return msg.channel.send("Please mention a user");
  if (msg.member === member)
    return msg.channel.send("You can't kick yourself");
  if (!member.kickable) return msg.channel.send("I can't kick that member");
  let reason = args.slice(1).join(" ") || "No reason given";
  const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
    `:white_check_mark: **${member.user.tag} has been kicked for ${reason}**`
    );
    const dmembed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
      `:x: **You were kicked from ${msg.guild.name} by ${msg.author.tag} for ${reason}**`
    );
  member.send({ embeds: [dmembed] }).catch((err) => {
    console.log(`${member.user.tag} was not kicked due to ${err}`);
  });
  member.kick().catch((err) => {
    msg.channel.send(`${member.user.tag} was not kicked due to ${err}`);
  });
  msg.channel.send({ embeds: [embed] });
}

//mute command
if (command === "mute") {
  const member =
    msg.mentions.members.first() ||
    msg.guild.members.cache.get(args[0]) ||
    msg.guild.members.cache.find(
      (x) =>
        x.user.username.toLowerCase() ===
        args.join(" " || x.username === args[0])
    );
  if (!msg.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
    return msg.channel.send("You don't have permission to mute members");
  if (!member) return msg.channel.send("Please mention a user");
  if (msg.member === member)
    return msg.channel.send("You can't mute yourself");
  if (!member.manageable) return msg.channel.send("I can't mute that member");
  let reason = args.slice(1).join(" ") || "No reason given";
  const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
    `:white_check_mark: **${member.user.tag} has been muted for ${reason}**`
    );
    const dmembed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
      `:x: **You were muted from ${msg.guild.name} by ${msg.author.tag} for ${reason}**`
    );
  member.send({ embeds: [dmembed] }).catch((err) => {
    console.log(`${member.user.tag} was not muted due to ${err}`);
  });
  member.timeout(1000).catch((err) => {
    msg.channel.send(`${member.user.tag} was not muted due to ${err}`);
  });
  msg.channel.send({ embeds: [embed] });
}
//unmute command
if (command === "unmute") {
  const member =
    msg.mentions.members.first() ||
    msg.guild.members.cache.get(args[0]) ||
    msg.guild.members.cache.find(
      (x) =>
        x.user.username.toLowerCase() ===
        args.join(" " || x.username === args[0])
    );
  if (!msg.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
    return msg.channel.send("You don't have permission to unmute members");
  if (!member) return msg.channel.send("Please mention a user");
  if (msg.member === member)
    return msg.channel.send("You can't unmute yourself");
  if (!member.manageable) return msg.channel.send("I can't unmute that member");
  let reason = args.slice(1).join(" ") || "No reason given";
  const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
    `:white_check_mark: **${member.user.tag} has been unmuted for ${reason}**`
    );
    const dmembed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(
      `:x: **You were unmuted from ${msg.guild.name} by ${msg.author.tag} for ${reason}**`
    );
  member.send({ embeds: [dmembed] }).catch((err) => {
    console.log(`${member.user.tag} was not unmuted due to ${err}`);
  });
  member.timeout(null).catch((err) => {
    msg.channel.send(`${member.user.tag} was not unmuted due to ${err}`);
  });
  msg.channel.send({ embeds: [embed] });
}
});

client.login(process.env.TOKEN);
