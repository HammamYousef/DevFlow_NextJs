import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  userId: Types.ObjectId;
  action: "upvote" | "downvote" | "view" | "post";
  actionType: "question" | "answer";
  actionId: Types.ObjectId;
}

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: ["upvote", "downvote", "view", "post"],
      required: true,
    },
    actionType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      refPath: "actionType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interaction =
  models?.interaction || model<IInteraction>("Interaction", InteractionSchema);
export default Interaction;
