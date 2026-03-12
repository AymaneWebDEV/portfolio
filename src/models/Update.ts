import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUpdate extends Document {
  title: string;
  content: string; // Markdown supported
  category: "blog" | "update" | "achievement";
  image?: string;
  createdAt: Date;
}

const UpdateSchema = new Schema<IUpdate>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["blog", "update", "achievement"],
      default: "update",
    },
    image: { type: String },
  },
  { timestamps: true }
);

const Update: Model<IUpdate> =
  mongoose.models.Update || mongoose.model<IUpdate>("Update", UpdateSchema);

export default Update;
