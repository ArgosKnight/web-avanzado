const pokemons = [];

const list = (req, res) => {
    res.render("pokedex", { title: "Pokédex", pokemons });
};

const save = (req, res) => {
    const { nombre, tipo, nivel, habilidad, region } = req.body;

    pokemons.push({ nombre, tipo, nivel, habilidad, region });

    res.redirect("/pokedex");
};

module.exports = { list, save };
