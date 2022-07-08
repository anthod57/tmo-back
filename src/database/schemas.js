import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String }
}, { collection: "users" });