const {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

function getGrid(rows) {
  const grid = [];

  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(rows[i].components[j].data.label);
    }
    grid.push(row);
  }

  return grid;
}

function checkForLine(rows) {
  const grid = getGrid(rows);

  // check all rows
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] === "-") continue;

    let equalRow = true;
    for (let j = 0; j < 2; j++) {
      equalRow &&= grid[i][j] === grid[i][j + 1];
    }
    if (equalRow) {
      return [
        [i, 0],
        [i, 1],
        [i, 2],
      ];
    }
  }

  // check all columns
  for (let j = 0; j < 3; j++) {
    if (grid[0][j] === "-") continue;

    let equalColumn = true;
    for (let i = 0; i < 2; i++) {
      equalColumn &&= grid[i][j] === grid[i + 1][j];
    }
    if (equalColumn) {
      return [
        [0, j],
        [1, j],
        [2, j],
      ];
    }
  }

  if (grid[1][1] === "-") return false;

  // check \ diagonal
  if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  }

  // check / diagonal
  if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
    return [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
  }

  return false;
}

function disableButtons(rows) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rows[i].components[j].setDisabled(true);
    }
  }
}

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
          content: "You cannot play tictactoe with yourself",
          ephemeral: true,
        });

        return;
      }

      if (targetUser.bot) {
        interaction.reply({
          content: "You cannot play tictactoe with a bot",
          ephemeral: true,
        });

        return;
      }

      const embed = new EmbedBuilder()
        .setTitle("TicTacToe")
        .setDescription(`it's ${targetUser}'s (X) turn`)
        .setColor("Yellow")
        .setTimestamp(new Date());

      const rows = [];
      for (let i = 0; i < 3; i++) {
        const buttons = [];
        for (let j = 0; j < 3; j++) {
          buttons.push(
            new ButtonBuilder()
              .setCustomId(`${i + 1}-${j + 1}`)
              .setLabel("-")
              .setStyle(ButtonStyle.Primary)
          );
        }
        rows.push(new ActionRowBuilder().addComponents(buttons));
      }

      let currentPlayer = targetUser;
      let currentChar = "X";

      const reply = await interaction.reply({
        embeds: [embed],
        components: rows,
      });

      for (let i = 0; i < 9; i++) {
        const currentUserInteraction = await reply
          .awaitMessageComponent({
            filter: (i) => i.user.id === currentPlayer.id,
            time: 30000,
          })
          .catch(async (error) => {
            embed.description = `Game Over, ${targetUser} did not respond in time.`;
            await reply.edit({ embeds: [embed], components: [] });
          });

        if (!currentUserInteraction) return;

        currentUserInteraction.deferUpdate();

        let [x, y] = currentUserInteraction.customId.split("-");
        rows[x - 1].components[y - 1].setLabel(currentChar);
        rows[x - 1].components[y - 1].setStyle(ButtonStyle.Secondary);
        rows[x - 1].components[y - 1].setDisabled(true);

        const completedRow = checkForLine(rows);

        if (completedRow) {
          embed.setDescription(`${currentPlayer} Has Won the Game !!`);
          disableButtons(rows);

          for (let i = 0; i < 3; i++) {
            const x = completedRow[i][0];
            const y = completedRow[i][1];
            rows[x].components[y].setStyle(ButtonStyle.Success);
          }

          await reply.edit({
            embeds: [embed],
            components: rows,
          });

          break;
        } else {
          if (currentPlayer === targetUser) {
            currentPlayer = interaction.user;
            currentChar = "O";
          } else {
            currentPlayer = targetUser;
            currentChar = "X";
          }

          embed.setDescription(`it's ${currentPlayer}'s (${currentChar}) turn`);

          await reply.edit({
            embeds: [embed],
            components: rows,
          });
        }
      }
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  },

  data: {
    name: "tictactoe",
    description: "play tictactoe with another user",
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
