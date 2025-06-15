import { model, models, Schema } from "mongoose";

export interface ITag {
  name: string;
  description?: string;
  questionsCount?: number;
}

export interface ITagDoc extends ITag, Document {}
const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    questionsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Tag = models?.tag || model<ITag>("Tag", TagSchema);
export default Tag;
