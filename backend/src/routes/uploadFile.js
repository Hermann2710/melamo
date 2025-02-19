import express from "express";
import uploads from "../middlewares/multer.js";

const uploadFile = express.Router();

uploadFile.post("", uploads.single("image"), function (req, res) {
  try {
    const path = req.file.filename;
    return res.json({
      path: path,
      message: "Image uploaded successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error when uploading image", error);
    if (error instanceof Error) {
      res.json({
        success: false,
        message: error.message,
      });
    } else {
      res.json({
        success: false,
        message: error,
      });
    }
  }
});

export default uploadFile;
