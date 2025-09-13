const home = (req, res) => {
    res.render("home", {title: "Inicio"})
}

const about = (req, res) => {
    res.render("about", {title: "Acerca de"})
}

const messages = [];

const contact = (req, res) => {
    res.render("contact");
}

const saveContact = (req, res) => {
  const { nombre, email, mensaje } = req.body;

  messages.push({ nombre, email, mensaje });

  res.redirect('/admin');
};

const admin  = (req, res) => {
    res.render("admin", { messages });
  };

const mainController = {
  home, 
  about, 
  contact,
  saveContact,
  admin
};


module.exports = mainController