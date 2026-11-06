import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    receiverId: { type: Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Message = model("Message", messageSchema);
