import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },        // Jaise: 'VIP Numbers'
  slug: { type: String, required: true },        // <-- Ye add kiya (Jaise: 'vip')
  description: { type: String, required: true }, // <-- 'desc' ko 'description' kiya seed.js se match karne ke liye
  preview: { type: String, required: true },     // Jaise: '98XXXXX999'
  count: { type: Number, default: 0 }            // Jaise: 320 (Available numbers)
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;