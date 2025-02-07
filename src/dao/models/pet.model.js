import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "pets";
const schema = new Schema(
  {
    name: { type: String, index: true, required: true },  
    age: { type: Number, required: true },  
    size: { type: String, enum: ["Small", "Medium", "Large"], required: true },  
    color: { type: String, required: true },  
    adopted: { type: Boolean, default: false },  
    owner: { type: String, default: null }, 
  },
  {
    timestamps: true, 
  }
);

schema.plugin(mongoosePaginate);
const Pet = model(collection, schema);
export default Pet;