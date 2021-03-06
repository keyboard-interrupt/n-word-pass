const express = require("express");
const ejs = require("ejs");
const path = require("path");
const applicationRouter = require("./routes/application");
const config = require("./config");

// create and configure app
const app = express();
app.set("view engine", "ejs");

// middlewares
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/application", applicationRouter);

// ejs test
app.get("/test", (req, res) => {
	res.render("test", { hello: "world" });
});

const PORT = config.PORT || 5050;
app.listen(PORT, () => console.log("server live on port " + PORT));
