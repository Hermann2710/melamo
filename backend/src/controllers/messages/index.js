import Message from "../../models/Message.js";
import Conversation from "../../models/Conversation.js";
import { getReceiverSocketId, io } from "../../socket/index.js";

export default class MessageController {
  static async fetchMessages(req, res) {
    try {
      const { receiverId, senderId } = req.params;
      const conversation = await Conversation.searchConversation({
        receiverId,
        senderId,
      });
      return res.json({
        success: true,
        conversation: conversation,
      });
    } catch (error) {
      console.log(`Error in message controller ${error.message}`);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
  static async addMessage(req, res) {
    try {
      const { receiverId, senderId, text } = req.body;
      if (!senderId) {
        return res.json({
          success: false,
          message: "You must be authenticated",
        });
      } else {
        if (!receiverId) {
          return res.json({
            success: false,
            message: "Please select a conversation",
          });
        } else {
          const conversation = await Conversation.searchConversation({
            receiverId: receiverId,
            senderId: senderId,
          });
          const message = await Message.createMessage({
            conversation: conversation._id,
            sender: senderId,
            text: text,
          });

          // SOCKET IO FUNCTIONNALITY WILL GO HERE
          const receiverSocketId = getReceiverSocketId(receiverId);
          if (receiverSocketId) {
            // io.to(<socket_id>).emit() to send event to the frontend
            io.to(receiverSocketId).emit("newMessage", message);
          }

          return res.json({
            success: true,
            message: "Message sent successfully",
            msg: message,
          });
        }
      }
    } catch (error) {
      console.log(`Error adding message: ${error.message}`);
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async editMessage(req, res) {
    try {
      const { messageId } = req.params;
      const { text, receiverId } = req.body;
      const message = await Message.editMessage({ messageId, text });

      // SOCKET IO FUNCTIONNALITY WILL GO HERE
      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId) {
        // io.to(<socket_id>).emit() to send event to the frontend
        io.to(receiverSocketId).emit("updateMessage", message);
      }

      return res.json({
        success: true,
        message: "Message updated successfully",
        msg: message,
      });
    } catch (error) {
      console.log(`Error in message controller ${error.message}`);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const { messageId, receiverId } = req.params;
      const message = await Message.deleteMessage({ messageId });
      await Conversation.removeMessage(message);

      // SOCKET IO FUNCTIONNALITY WILL GO HERE
      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId) {
        // io.to(<socket_id>).emit() to send event to the frontend
        io.to(receiverSocketId).emit("deleteMessage", message);
      }

      return res.json({
        success: true,
        message: "Message deleted successfully",
        msg: message,
      });
    } catch (error) {
      console.log(`Error in message controller ${error.message}`);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
}
