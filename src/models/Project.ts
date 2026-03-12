import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  technologies: string[];
  visuals: string[]; // Image URLs
  repoLink?: string;
  demoLink?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true }, // Short description for cards
    content: { type: String, required: true }, // Full Markdown/Rich Text content
    technologies: { type: [String], required: true },
    visuals: { type: [String], default: [] },
    repoLink: { type: String },
    demoLink: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model recompilation error in development
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
