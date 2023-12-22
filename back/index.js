const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors("*"));

require("dotenv").config();

// Configuration du router
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");
const usersRouter = require("./users/users");

const livresRouter = require("./livres/livres");
const abonnesRouter = require("./abonnes/abonnes");
const ficheRouter = require("./abonnes/fiche");

// Définition des routes API
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);

app.use("/livres", livresRouter);
app.use("/abonnes", abonnesRouter);
app.use("/fiche", ficheRouter);

//* ------------------------ Lancement du serveur API ------------------------ */
const port = 5000;
app.listen(port, () => {
  console.log(`APi démarrée sur le port: ${port}`);
});
