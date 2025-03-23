"use server";

import dbConnect from "../db";
import Product, { IProduct } from "../models/product";

export const createProduct = async (product: IProduct) => {
    try {
        await dbConnect();
      
        const newProduct = await Product.create(product);
      
        return newProduct._id.toString();
    } catch (e) {
        console.error("Error creating product", e);
        throw new Error("Error creating product");
    }
};

export const getProducts = async () => {
  await dbConnect();

  const products = await Product.find({});

  return products;
};

export const getSingleProduct = async (id: string) => {
  await dbConnect();

  const product = await Product.findById(id);

  return product;
};

export const updateProduct = async (id: string) => {
  await dbConnect();

  const updatedProduct = await Product.updateOne({ _id: id });

  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  await dbConnect();

  const deletedProduct = await Product.deleteOne({ _id: id });

  return deletedProduct;
};
