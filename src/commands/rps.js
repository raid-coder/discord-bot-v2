const {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const choices = [
  {
    name: "Rock",
    emoji: "🪨",
    beats: "Scissors",
  },
  {
    name: "Scissors",
    emoji: "✂",
    beats: "Paper",
  },
  {
    name: "Paper",
    emoji: "📄",
    beats: "Rock",
  },
];

module.exports = {
  /**
   * @param {Object} param0
   * @param {ChatInputCommandInteraction} param0.interaction
   */
  run: async ({ interaction }) => {
    try {
      const targetUser = interaction.options.getUser("user");

      if (interaction.user.id === targetUser.id) {
        interaction.reply({
          content: "You cannot play rock paper scissors with yourself",
          ephemeral: true,
        });

        return;
      }

      if (targetUser.bot) {
        interaction.reply({
          content: "You cannot play rock paper scissors with a bot",
          ephemeral: true,
        });

        return;
      }

      const embed = new EmbedBuilder()
        .setTitle("Rock Paper Scissors")
        .setDescription(`it's ${targetUser}'s turn`)
        .setColor("Yellow")
        .setTimestamp(new Date());

      const buttons = choices.map((choice) => {
        return new ButtonBuilder()
          .setCustomId(choice.name)
          .setLabel(choice.name)
          .setStyle(ButtonStyle.Primary)
          .setEmoji(choice.emoji);
      });

      const row = new ActionRowBuilder().addComponents(buttons);

      const reply = await interaction.reply({
        content: `${targetUser}, you have been challenged to a game of Rock Paper Scissors by ${interaction.user}, to Start playing click one of the buttons below`,
        embeds: [embed],
        components: [row],
      });

      const targetUserInteraction = await reply
        .awaitMessageComponent({
          filter: (i) => i.user.id === targetUser.id,
          time: 30000,
        })
        .catch(async (error) => {
          embed.description = `Game Over, ${targetUser} did not respond in time.`;
          await reply.edit({ embeds: [embed], components: [] });
        });

      if (!targetUserInteraction) return;

      const targetUserChoice = choices.find(
        (choice) => choice.name === targetUserInteraction.customId
      );

      await targetUserInteraction.reply({
        content: `You Picked ${targetUserChoice.name + targetUserChoice.emoji}`,
        ephemeral: true,
      });

      embed.setDescription(`it's currently ${interaction.user}'s turn.`);
      await reply.edit({
        content: `${interaction.user} it is your turn to play`,
        embeds: [embed],
      });

      const initialUserInteraction = await reply
        .awaitMessageComponent({
          filter: (i) => i.user.id === interaction.user.id,
          time: 30000,
        })
        .catch(async (error) => {
          embed.description = `Game Over, ${interaction.user} did not respond in time.`;
          await reply.edit({ embeds: [embed], components: [] });
        });

      if (!initialUserInteraction) return;

      const initialUserChoice = choices.find(
        (choice) => choice.name === initialUserInteraction.customId
      );

      let result;

      if (targetUserChoice.beats === initialUserChoice.name) {
        result = `${targetUser} Won!`;
      }

      if (initialUserChoice.beats === targetUserChoice.name) {
        result = `${interaction.user} Won!`;
      }

      if (initialUserChoice.name === targetUserChoice.name) {
        result = `It was a tie!`;
      }

      embed.setDescription(`${targetUser} Picked ${
        targetUserChoice.name + targetUserChoice.emoji
      }
      ${interaction.user} Picked ${
        initialUserChoice.name + initialUserChoice.emoji
      }
      
      ${result}`);

      reply.edit({
        embeds: [embed],
        components: [],
      });
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  },

  data: {
    name: "rps",
    description: "play rock paper scissors with another user",
    dm_permission: false,
    options: [
      {
        name: "user",
        description: "the user you want to play with",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
};
