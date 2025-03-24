"use server";

import dbConnect from "../db";
import Review from "../models/review";

// import mongoose from "mongoose";

export const createReview = async (name: string, rating: number, review: string) => {
  try {
    await dbConnect();

    const createdReview = await Review.create({
      name, rating, review
    });

    return createdReview;
  } catch (e) {
    console.error("Error creating review", e);
    throw new EvalError("Error creating review");
  }
};

export const getReviewsAndRating = async (productId: string) => {
  try {
    await dbConnect();

    const reviews = await Review.find({ productId });

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    // const averageRatingResult = await Review.aggregate([
    //   { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    //   { $group: { _id: null, average: { $avg: "$rating" } } },
    // ]);

    // const averageRating = averageRatingResult[0]?.average || 0;

    return { reviews, averageRating };
  } catch (e) {
    console.error("Error getting reviews", e);
    throw new EvalError("Error getting reviews");
  }
};
