import { model, models, Schema, Types, Document } from "mongoose";

export interface IInteraction {
  userId: Types.ObjectId;
  action: string;
  actionType: "question" | "answer";
  actionId: Types.ObjectId;
}

export const InteractionActionEnums = [
  "view",
  "upvote",
  "downvote",
  "bookmark",
  "post",
  "edit",
  "delete",
  "search",
] as const;

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: InteractionActionEnums,
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
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);
export default Interaction;
