import { Button } from "@/components/ui/button";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Send, Edit3 } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  isEditMode: boolean;
};

function MessageForm({ handleSubmit, message, setMessage, isEditMode }: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full bg-white rounded-lg">
      <Input
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your message"
        name="message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <Button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        {isEditMode ? (
          <>
            <Edit3 size={16} />
            Edit
          </>
        ) : (
          <>
            <Send size={16} />
            Send
          </>
        )}
      </Button>
    </form>
  );
}

export default MessageForm;