import PostForm from "@/components/admin/posts/PostForm";
import PostList from "@/components/admin/posts/PostList";
import { Button } from "@/components/ui/button";
import Post, { initialPostState } from "@/types/Post";
import { useState } from "react";

function AdminPosts() {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [data, setData] = useState<Post>(initialPostState);
  return (
    <div>
      <div>
        <h1 className="capitalize font-bold text-2xl">Posts list</h1>
        <PostList
          setData={setData}
          setSelectedId={setSelectedId}
          setOpen={setOpenFormDialog}
        />
        <Button
          onClick={() => setOpenFormDialog(true)}
          variant="outline"
          className="float-end"
        >
          Add post
        </Button>
      </div>
      <PostForm
        open={openFormDialog}
        setOpen={setOpenFormDialog}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default AdminPosts;
