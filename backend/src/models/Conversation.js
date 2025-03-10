import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  {
    timestamps: true,
    statics: {
      async searchConversation({ receiverId, senderId }) {
        try {
          if (!receiverId) {
            throw new Error("Receiver is required");
          }
          if (!senderId) {
            throw new Error("Request not authorized");
          }

          let conversation = await this.findOne({
            users: { $all: [senderId, receiverId] },
          }).populate(["users", "messages"]);

          if (!conversation) {
            conversation = await this.create({
              users: [senderId, receiverId],
            });
          }

          return conversation;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      async addMessage({ _id, message }) {
        try {
          if (!_id) {
            throw new Error("Please select a conversation");
          }
          if (!message) {
            throw new Error("Please send a message");
          }

          const conversation = await this.findById(_id).populate(["users", "messages"]);
          if (!conversation) {
            throw new Error("Please select a conversation");
          } else {
            conversation.messages.push(message);

            await conversation.save();
            return conversation;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
      async removeMessage(message) {
        try {
          const conversation = await this.findById(message.conversation).populate(["users", "messages"]);
          if (!conversation) {
            throw new Error("Couldn't find conversation");
          } else {
            const messages = conversation.messages.filter(
              (mes) => mes.toString() !== message._id
            );
            conversation.messages = messages;
            await conversation.save();
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
