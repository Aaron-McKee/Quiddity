import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuidSchema = new Schema({
 userId: {
    type: String,
    required: true,
 },
 title: {
    type: String,
    required: true,
 },
 desc: {
    type: String,
    required: true,
 },
 totalStars: {
    type: Number,
    default: 0,
 },
 starNumber: {
    type: Number,
    default: 0,
 },
 cat: {
    type: String,
    required: false,
 },
 price: {
    type: Number,
    required: true,
 },
 cover: {
    type: String,
    required: true,
 },
 images: {
    type: [String],
    required: false,
 },
 shortTitle: {
    type: String,
    required: true,
 },
 shortDesc: {
    type: String,
    required: true,
 },
 deliveryTime: {
    type: Number,
    required: true,
 },
 revisionNumber: {
    type: Number,
    required: false,
 },
 features: {
    type: [String],
    required: false,
 },
 sales: {
    type: Number,
    default: 0,
 },

},{
    timestamps: true,
 });

 export default mongoose.model("Quid", QuidSchema );