import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  content: string;
  questionId: Types.ObjectId;
  authorId: Types.ObjectId;
  votes?: {
    upvotes?: number;
    downvotes?: number;
  };
}

export interface IAnswerDoc extends IAnswer, Document {}
const AnswerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    votes: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Answer = models?.answer || model<IAnswer>("Answer", AnswerSchema);
export default Answer;
