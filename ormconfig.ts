module.exports = [
  {
    name: "default",
    type: "postgres",
    port: 5432,
    synchronize: false,
    migrationsRun: true,
    logging: true,
    url: process.env.DATABASE_URL,
    // host: process.env.DATABASE_URL, //`/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    // username: process.env.DB_USER,
    // database: process.env.DB_DATABASE,
    // password: process.env.DB_PASS,
    entities: ["src/entities/*{.js,.ts}"],
    migrations: ["src/migrations/*{.js,.ts}"],
    // ssl: true,
    ssl: {
      rejectUnauthorized: true,
    },
    define: {
      timestamps: false,
    },
    cli: {
      migrationsDir: "src/migrations",
    },
  },
  //,
  // {
  //   name: "seed",
  //   type: "postgres",
  //   port: 5432,
  //   synchronize: false,
  //   migrationsRun: true,
  //   logging: true,
  //   host: "0.0.0.0",
  //   username: "postgres",
  //   database: "instastore",
  //   password: "postgres",
  //   extra: {
  //     ssl: true,
  //   },
  //   entities: ["src/entities/*{.js,.ts}"],
  //   migrations: ["src/seeds/*{.js,.ts}"],
  //   cli: {
  //     migrationsDir: "src/seeds",
  //   },
  // },
];
