const router = require("express").Router();
const multer = require("multer");
const formData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const storage = require("../storageEngine");
const config = require("../config");

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

		const imgPath = req.file.path;
		const imgName = req.file.filename;

		const form = new formData();
		form.append("photo", fs.createReadStream(imgPath));

		axios
			.create({
				headers: form.getHeaders(),
			})
			.post(`${config.RACIAL_DETECTION_API_LOCATION}/detect-race`, form)
			.then((response) => {
				console.log(response.data);

				if (response.data.error) return res.send(response.data.error);

				race = response.data.race.dominant_race;
				score = response.data.race.race.black;

				if (race == "black")
					return res.send(`you are black with score of ${score}%`);
				else return res.send(`you are not black. you are ${race}`);
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
				}
				console.log(error.message);
				res.status(500).send("there was an error");
			});
	});
});

module.exports = router;
