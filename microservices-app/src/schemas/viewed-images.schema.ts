
import * as mongoose from 'mongoose';

export const ViewedImagesSchema = new  mongoose.Schema({
  username: { type: String, required: true },
  imagesList: [{ type: String}],
});

export interface ViewedImages extends mongoose.Document {
  username: string;
  imagesList: string[];
}
