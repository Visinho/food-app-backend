import categoryModel from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required.' });
        }

        const image_filename = req.file.filename;

        const category = new categoryModel({
            name: req.body.name,
            image: image_filename
        });

        await category.save();
        res.json({ success: true, message: "Category Added!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while creating category!" });
    }
};


// Get all categories
export const listCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json({ success: true, data: categories });
    } catch (error) {
        res.json({ success: false, message: "Error fetching categories!" });
    }
};
