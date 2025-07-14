import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Add food item
const addFood = async (req, res) => {
    // if (!req.file) {
    //     return res.status(400).json({ success: false, message: 'Image file is required.' });
    // }

    // const image_filename = req.file.filename;

    const image_filename = req.file ? req.file.filename : 'default.jpg';

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while creating food!" });
    }
};

export {addFood}