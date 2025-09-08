import express from "express";
import multer from "multer";
import { addCategory, listCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/list", listCategories);

export default categoryRouter;
