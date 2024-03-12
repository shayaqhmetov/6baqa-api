import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});
