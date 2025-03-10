import mongoose from "mongoose";
import Conversation from "./Conversation.js";

const MessageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
  },
  {
    timestamps: true,
    statics: {
      async createMessage({ conversation, sender, text }) {
        try {
          let message = await this.create({ conversation, sender, text });
          await Conversation.addMessage({
            _id: conversation,
            message: message,
          });
          message = await message.populate(["conversation"]);
          return message;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      async editMessage({ messageId, text }) {
        try {
          const message = await this.findById(messageId).populate([
            "conversation",
            "sender",
          ]);
          if (!message) {
            throw new Error("Couldn't find message");
          } else {
            message.text = text ? text : message.text;
            await message.save();
            return message;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
      async deleteMessage({ messageId }) {
        try {
          const message = await this.findById(messageId).populate([
            "conversation",
            "sender",
          ]);
          if (!message) {
            throw new Error("Couldn't find message");
          } else {
            await message.deleteOne();
            return message;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
