import { model, models, Schema, Types, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  author: Types.ObjectId;
  answers?: number;
  views?: number;
  votes?: {
    upvotes?: number;
    downvotes?: number;
  };
}

export interface IQuestionDoc extends IQuestion, Document {}
const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    votes: {
      type: {
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);
export default Question;
