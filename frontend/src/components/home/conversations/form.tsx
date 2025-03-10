import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
};

function MessageForm({ handleSubmit, message, setMessage }: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        className="flex-1"
        placeholder="Your message"
        name="message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button>Message</Button>
    </form>
  );
}

export default MessageForm;
