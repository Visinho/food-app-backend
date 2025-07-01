import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Visinho91:admin@cluster0.0gu2m.mongodb.net/Food-App?retryWrites=true&w=majority&appName=Cluster0"
  ).then(()=>console.log("DB Connected!"));
};
