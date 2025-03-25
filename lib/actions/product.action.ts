"use server";

import dbConnect from "../db";
import Product, { IProduct } from "../models/product";

import { unstable_cache as cache } from "next/cache";

export const createProduct = async (product: IProduct) => {
  await dbConnect();

  try {
    const newProduct = await Product.create(product);

    return newProduct._id.toString();
  } catch (e) {
    console.error("Error creating product", e);
    throw new Error("Error creating product");
  }
};

export const getProducts = async () => {
  try {
    await dbConnect();

    const products = await Product.find({});

    return products;
  } catch (e) {
    console.error("Error getting product", e);
    throw new EvalError("Error getting product");
  }
};

const _getSingleProduct = async (id: string) => {
  await dbConnect();

  try {
    const product = await Product.findById(id);

    if (!product) {
      return null;
    }

    return product;
  } catch (e) {
    console.error("Error getting single product", e);
    return null;
  }
};

export const getSingleProduct = cache(_getSingleProduct, ["getSingleProduct"], {
  tags: ["Product"],
});

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  await dbConnect();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updatedProduct._id.toString();
  } catch (e) {
    console.error("Error updating product", e);
    throw new Error("Error updating product");
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await dbConnect();
  try {
    const result = await Product.deleteOne({ _id: id });

    return result.deletedCount === 1;
  } catch (e) {
    console.error("Error deleting product", e);
    throw new Error("Error deleting product");
  }
};
