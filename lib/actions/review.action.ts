"use server";

import dbConnect from "../db";
import Review, { IReview } from "../models/review";

import { unstable_cache as cache, revalidateTag } from "next/cache";

// import mongoose from "mongoose";

export const createReview = async (review: IReview) => {
  await dbConnect();
  try {
    const newReview = await Review.create(review);

    revalidateTag("getReviewsAndRating");

    return newReview._id.toString();
  } catch (e) {
    console.error("Error creating review", e);
    throw new EvalError("Error creating review");
  }
};

const _getReviewsAndRating = async (productId: string) => {
  try {
    await dbConnect();

    const reviews = await Review.find({ productId });

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    return { reviews, averageRating };
  } catch (e) {
    console.error("Error getting reviews", e);
    throw new EvalError("Error getting reviews");
  }
};

export const getReviewsAndRating = cache(_getReviewsAndRating, ["getReviewsAndRating"], {
  tags: ["getReviewsAndRating"],
  revalidate: 60,
});

export const updateReview = async (productId: string) => {
  try {
    await dbConnect();

    const updatedReview = await Review.updateOne({ productId });

    revalidateTag("getReviewsAndRating");

    return updatedReview;
  } catch (e) {
    console.error("Error updating review", e);
    throw new Error("Error upodating review");
  }
};
