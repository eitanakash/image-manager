
import * as mongoose from 'mongoose';

export const UploadedImagesSchema = new  mongoose.Schema({
  username: { type: String, required: true },
  imagesList: [{ type: String}],
});

export interface UploadedImages extends mongoose.Document {
  username: string;
  imagesList: string[];
}
