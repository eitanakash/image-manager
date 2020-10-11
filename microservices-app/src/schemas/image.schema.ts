import * as mongoose from 'mongoose';
import { Buffer } from 'buffer';

const data = new mongoose.Schema({
  contentType: { type: Buffer, contentType: String, required: false },
  image: { type: Buffer, contentType: String, required: false },
});

export const ImageSchema = new mongoose.Schema({
  originalName: { type: String, required: false },
  uploader: { type: String, required: false },
  encoding: { type: String, required: false },
  size: { type: Number, required: false },
  fileId: { type: String, required: false, unique: true },
  data,
  mimetype: { type: String, required: false },
});

export interface Image extends mongoose.Document {
  id?: string;
  originalName?: string;
  uploader?: string;
  encoding?: string;
  size?: number;
  fileId?: string;
  data?: any;
  mimetype: string;
}
