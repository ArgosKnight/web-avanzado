const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

const pokedexRoutes = require("./routes/pokedexRoutes");
app.use("/pokedex", pokedexRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

app.use((req, res, next) => {
  res.status(404).render('notFound', { url: req.originalUrl });
});
