const express = require('express');
const app = express();
const db = require("./db");
const bodyParser = require('body-parser');
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to my hotel, how can i help you ?");
});
app.use("/", personRoutes);
app.use("/", menuRoutes);

db.connect();

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});