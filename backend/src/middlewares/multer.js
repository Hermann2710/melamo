import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.filename);
  },
});

const uploads = multer({ storage: storage });

export default uploads;
