import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path/win32";

const bookRouter = express.Router();

// create multer middleware for uploading coverImage and pdf file on cloudinary .
// by multer middleware upload file and coverImage locally and then cloudinary.
//  and after uploading on cloudinary delete from locally stored file and coverImage

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // max file size - 30mb
});

bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
