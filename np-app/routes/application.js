const router = require("express").Router();

router.post("/", (req, res) => {
	console.log(req.files);
	res.send("recieved");
});

module.exports = router;
