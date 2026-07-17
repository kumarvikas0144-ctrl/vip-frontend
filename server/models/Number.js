import mongoose from 'mongoose';

const numberSchema = new mongoose.Schema({
    number: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, 
    circle: { type: String, required: true },   
    status: { type: String, default: 'Available' } 
}, { timestamps: true });

const VipNumber = mongoose.model('Number', numberSchema);

export default VipNumber;