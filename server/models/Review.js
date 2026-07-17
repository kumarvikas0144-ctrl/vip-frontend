import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({ customerName: String, city: String, reviewText: String, rating: Number }, { timestamps: true })
export default mongoose.model('Review', reviewSchema)
