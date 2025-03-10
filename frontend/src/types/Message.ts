import Conversation from "./Conversation";

export default interface Message {
  _id: string;
  conversation: Conversation | null;
  text: string;
  sender: any;
  createdAt: string;
  updatedAt: string;
}

export const initialMessageData: Message = {
  _id: "",
  conversation: null,
  text: "",
  createdAt: "",
  sender: null,
  updatedAt: "",
};
