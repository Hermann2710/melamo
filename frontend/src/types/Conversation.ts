import Message from "./Message";
import User from "./User";

export default interface Conversation {
  _id: string;
  users: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export const initialConversationState: {
  isLoading: boolean;
  conversation: Conversation | null;
} = {
  isLoading: false,
  conversation: null,
};
