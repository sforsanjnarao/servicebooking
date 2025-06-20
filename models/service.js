// models/Service.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;