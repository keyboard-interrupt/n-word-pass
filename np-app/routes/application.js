const router = require("express").Router();
const multer = require("multer");
const storage = require("../storageEngine");

// init upload
const upload = multer({
	storage: storage,
}).single("picture");

router.get("/", (req, res) => {
	res.render("application");
});

router.post("/", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.send("error with file");
			return;
		}
		console.log(req.file);
		res.send("uploaded");
	});
});

module.exports = router;
