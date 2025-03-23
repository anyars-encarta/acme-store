import { model, models, Schema } from "mongoose";

interface IProduct {
    name: string;
    price: number;
    description: string;
    category: string;
    images: string[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {type: String, required: true },
    price: {type: Number, required: true },
    description: {type: String, required: true },
    category: {type: String, required: true },
    images: [{type: String, required: true }],
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", ProductSchema);

export default Product;
