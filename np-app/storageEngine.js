const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: path.join(__dirname, "public", "assets", "img", "uploads"),
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

module.exports = storage;
