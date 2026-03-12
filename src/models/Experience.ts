import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema(
  {
    type: { type: String, enum: ["work", "education"], required: true },
    title: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
