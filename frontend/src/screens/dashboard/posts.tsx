import PostForm from "@/components/dashboard/posts/form";
import DashboardPostList from "@/components/dashboard/posts/post-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function DashboardPosts() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-2">Dashboard posts list</h1>
        <DashboardPostList setOpen={setOpen} setSelectedId={setSelectedId} />
        <Button
          className="float-end"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          Add post
        </Button>
      </div>
      <PostForm
        open={open}
        setOpen={setOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default DashboardPosts;
