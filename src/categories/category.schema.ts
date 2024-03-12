import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  isActive: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
