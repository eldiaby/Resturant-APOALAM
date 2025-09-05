import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
		cb(null, uniqueName);
	},
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
	const allowedTypes = /jpeg|jpg|png|webp|gif/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase(),
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Only image files are allowed!"));
	}
};

const upload = multer({ storage, fileFilter });

export default upload;
