import { model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  authorId: Types.ObjectId;
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
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  models?.question || model<IQuestion>("Question", QuestionSchema);
export default Question;
