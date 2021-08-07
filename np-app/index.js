require("dotenv").config();

const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log("server live on port " + PORT));
