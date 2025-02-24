import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "src/uploads");
  },
  filename: (_, file, cb) => {
    const filename = new Date().getTime() + "-" + file.originalname;
    cb(null, filename);
  },
});

const fileFilter = (_, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only images are allowed"), false);
  }
  return cb(null, true);
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

export default uploads;
