const express = require("express");
const cors = require("cors");

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());

app.get("/", (req, res) => res.send("Hello World Na Aws!"));
app.listen(PORT, HOST);
