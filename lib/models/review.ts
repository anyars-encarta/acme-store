import { model, models, Schema } from "mongoose";

const AuthorSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
});

export interface IReview {
    author: {
        name: string;
        email: string;
    };
    productId: string | Schema.Types.ObjectId;
    rating: number;
    content: string
}

const ReviewSchema = new Schema<IReview>(
  {
    author: { type: AuthorSchema, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true},
    rating: {type: Number, required: true},
    content: {type: String, required: true},
  },
  { timestamps: true }
);

const Review = models?.Review || model<IReview>("Review", ReviewSchema);

export default Review;
