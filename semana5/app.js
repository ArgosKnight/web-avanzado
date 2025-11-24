const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json()); 
app.use(cors());
app.use(morgan("dev"));

const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");
const errorHandler = require("./middlewares/error-handler");

app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
