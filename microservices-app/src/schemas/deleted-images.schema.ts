
import * as mongoose from 'mongoose';

export const DeletedImagesSchema = new  mongoose.Schema({
  username: { type: String, required: true },
  imagesList: [{ type: String}],
});

export interface DeletedImages extends mongoose.Document {
  username: string;
  imagesList: string[];
}
