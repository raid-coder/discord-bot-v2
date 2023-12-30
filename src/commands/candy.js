const {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const iconURL =
  "https://i.pinimg.com/564x/e9/61/80/e961805e0fbe5aad361bc1339d32de06.jpg";

const choices = {
  python: {
    title: "Python",
    description:
      "Python is a versatile, high-level programming language known for its readability and simplicity. It facilitates a wide range of applications, from web development and scientific computing to artificial intelligence and data analysis. Its clean syntax and extensive libraries make it beginner-friendly yet powerful for seasoned developers.",
    image:
      "https://i.pinimg.com/564x/ed/66/63/ed666327dd3ce274d94f2b3547155891.jpg",
  },
  java: {
    title: "Java",
    description: `Java is a robust, object-oriented programming language. Its "write once, run anywhere" capability has made it popular for building scalable applications.It is extensively used in enterprise systems, Android app development, and web applications. Its strong community support and portability are its hallmarks.`,
    image:
      "https://i.pinimg.com/564x/04/fa/d7/04fad746503aef15aa3b136399842f52.jpg",
  },
  kotlin: {
    title: "Kotlin",
    description:
      " Kotlin is a statically typed language used mainly for Android app development. Praised for its conciseness, safety features, and interoperability with Java, it has gained popularity among developers seeking an alternative to Java for Android development.",
    image:
      "https://i.pinimg.com/564x/ac/0b/71/ac0b718d995deda3e1e4ee893501324d.jpg",
  },
  javascript: {
    title: "JavaScript",
    description:
      "JavaScript is the language of the web, enabling interactive and dynamic front-end experiences. It runs in browsers, allowing developers to create engaging user interfaces and handle client-side functionalities. With frameworks like React and Node.js, it is used for both front-end and back-end development.",
    image:
      "https://i.pinimg.com/564x/86/0b/c3/860bc39206a8d80c64a37a6f17450ae8.jpg",
  },
  php: {
    title: "PHP",
    description:
      " PHP is a server-side scripting language primarily used for web development. It is especially adept at creating dynamic web pages and handling form data. Popular content management systems like WordPress are built using PHP.",
    image:
      "https://i.pinimg.com/564x/f4/06/ef/f406ef95c81461c9516423d785f6757c.jpg",
  },
  ruby: {
    title: "Ruby",
    description:
      "Ruby is valued for its simplicity and productivity. It is commonly associated with the Ruby on Rails framework, facilitating rapid development of web applications. Its focus on developer happiness and elegant syntax has garnered a dedicated community.",
    image:
      "https://i.pinimg.com/564x/bc/3f/04/bc3f04efca03c6b2661c9e9500b9a549.jpg",
  },
  swift: {
    title: "Swift",
    description:
      " Swift is Apple modern language for developing iOS, macOS, watchOS, and tvOS applications. It is known for its safety features, speed, and conciseness. Swift is used by millions of developers around the world, and it is a widely used programming language. Its popularity stems from its ease of learning and powerful capabilities.",
    image:
      "https://i.pinimg.com/564x/92/7c/96/927c961d2926232ae87d325eedff5441.jpg",
  },
  rust: {
    title: "Rust",
    description:
      " Rust focuses on safety, speed, and concurrency. It is gaining traction in systems programming, where memory safety and performance are crucial. Its ownership system ensures memory safety without compromising speed.",
    image:
      "https://i.pinimg.com/564x/3a/32/18/3a3218e0479a473c493239bb6052be12.jpg",
  },
  go: {
    title: "Go-lang",
    description:
      "Go, or Golang, is a language developed by Google known for its simplicity and efficiency. It is utilized in building scalable systems and cloud-based applications. Go is built-in support for concurrency and its performance makes it ideal for distributed systems.",
    image:
      "https://i.pinimg.com/564x/f2/25/8e/f2258e9687c3f0929329c9aa009b7d27.jpg",
  },
  typescript: {
    title: "TypeScript",
    description:
      "TypeScript is a superset of JavaScript that introduces static typing to the language. It aids in scaling large JavaScript applications by catching errors during development. TypeScript integrates seamlessly with existing JavaScript codebases.",
    image:
      "https://i.pinimg.com/564x/5c/88/9d/5c889d33114df76e3cb00bc5897a3abe.jpg",
  },
  scala: {
    title: "Scala",
    description:
      " Scala is a language that runs on the Java Virtual Machine (JVM), combining object-oriented and functional programming paradigms. It is known for its expressiveness and scalability, particularly in building high-performance applications.",
    image:
      "https://i.pinimg.com/564x/51/ba/e6/51bae69baac15a2053e7c6fda46f2b24.jpg",
  },
  haskell: {
    title: "Haskell",
    description:
      " Haskell is a purely functional programming language with a strong type system. It emphasizes immutability and declarative programming. Haskell's type safety and mathematical foundations make it suitable for building robust and error-free applications.",
    image:
      "https://i.pinimg.com/564x/e1/ba/62/e1ba625dbf0cb730fc021491df58e6d7.jpg",
  },
};

module.exports = {
  /**
   * @param {Object} param0
   * @param {ChatInputCommandInteraction} param0.interaction
   */
  run: async ({ interaction }) => {
    try {
      const chosenLanguage = interaction.options.getString("language");
      const choice = choices[chosenLanguage];
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(choice.title)
        .setAuthor({
          name: "Candy bot",
          iconURL:
            "https://i.pinimg.com/564x/e9/61/80/e961805e0fbe5aad361bc1339d32de06.jpg",
        })
        .setDescription(choice.description)
        .setImage(choice.image)
        .setTimestamp()
        .setFooter({
          text: "Candy bot",
          iconURL:
            "https://i.pinimg.com/564x/e9/61/80/e961805e0fbe5aad361bc1339d32de06.jpg",
        });
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  },

  data: {
    name: "lang",
    description: "show language description",
    dm_permission: false,
    options: [
      {
        name: "language",
        description: "the language you want to learn",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "python",
            value: "python",
          },
          {
            name: "java",
            value: "java",
          },
          {
            name: "kotlin",
            value: "kotlin",
          },
          {
            name: "javascript",
            value: "javascript",
          },
          {
            name: "php",
            value: "php",
          },
          {
            name: "ruby",
            value: "ruby",
          },
          {
            name: "swift",
            value: "swift",
          },
          {
            name: "rust",
            value: "rust",
          },
          {
            name: "go",
            value: "go",
          },
          {
            name: "typescript",
            value: "typescript",
          },
          {
            name: "scala",
            value: "scala",
          },
          {
            name: "haskell",
            value: "haskell",
          },
        ],
      },
    ],
  },
};
