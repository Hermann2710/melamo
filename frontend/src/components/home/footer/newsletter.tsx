import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

function Newsletter() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center text-muted my-5">
        <div className="w-full sm:w-[80%] lg:w-[70%]">
            <h1 className="my-2 text-xl font-bold text-center">Send your email to suscribe our newsletter</h1>
            <form className="flex gap-2 min-w-max" onSubmit={handleSubmit}>
                <Input placeholder="Your email" type="email" />
                <Button variant="secondary">Subscribe</Button>
            </form>
        </div>
    </div>
  );
}

export default Newsletter;
