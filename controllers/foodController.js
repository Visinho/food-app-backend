import foodModel from "../models/foodModel.js";
import path from "path";
import fs from 'fs'

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const image_filename = req.file.filename;

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

// List All Foods
const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error fetching all items!"})
    }
}

// Delete food item
const deleteFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.params.id);
        res.json({success: true, message: "Food has been deleted"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error deleting food!"})
    }
}

export {addFood, listFood, deleteFood}