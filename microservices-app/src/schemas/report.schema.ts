
import * as mongoose from 'mongoose';


// const data = new mongoose.Schema({
//   contentType: { type: Buffer, contentType: String, required: false },
//   image: { type: Buffer, contentType: String, required: false },
// });


export const ReportSchema = new mongoose.Schema({
  totalImages: { type: Number, required: false, default: 0 },
  // description: { type: String, required: false },
  // price: { type: Number, required: false },
  // data: [data],
});

export interface Report extends mongoose.Document {
  id?: string;
  totalImages?: number;
  // description?: string;
  // price?: number;
  // data?: Buffer;
}