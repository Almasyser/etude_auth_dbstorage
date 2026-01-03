require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "6000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Erreur serveur",err);
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server ecoute sur le port ${port}`);
  }
});
