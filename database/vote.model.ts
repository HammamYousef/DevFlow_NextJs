import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
  targetId: Types.ObjectId;
}

export interface IVoteDoc extends IVote, Document {}
const voteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
    targetId: { type: Schema.Types.ObjectId, refPath: "type", required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models?.vote || model<IVote>("Vote", voteSchema);
export default Vote;
