"use server";

import dbConnect from "../db";
import Product, { IProduct } from "../models/product";

import { unstable_cache as cache, revalidateTag } from "next/cache";

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

export const getProducts = async (
  page: number,
  search: string,
  minPrice: number,
  category: string
) => {
  await dbConnect();

  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $project: {
          name: 1,
          price: 1,
          image: { $first: "$images" },
          averageRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $match: {
          name: {
            $regex: search,
            $options: "i",
          },
          price: {
            $gte: minPrice,
          },
          ...(category && { category: category }),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    revalidateTag("Product");

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
  revalidate: 60,
});

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  await dbConnect();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidateTag("Product");

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

    revalidateTag("Product");

    return result.deletedCount === 1;
  } catch (e) {
    console.error("Error deleting product", e);
    throw new Error("Error deleting product");
  }
};
