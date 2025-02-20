import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store";
import { Edit2, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeletePostDialog from "./DeletePostDialog";
import Post from "@/types/Post";

type PostListProps = {
  setSelectedId: React.Dispatch<SetStateAction<string>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<Post>>;
};

function PostList({ setSelectedId, setOpen, setData }: PostListProps) {
  const { posts } = useSelector((state: RootState) => state.posts);
  const [post, setPost] = useState<Post | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = (post: Post) => {
    setSelectedId(post._id);
    setData(post);
    setOpen(true);
  };

  const showDialog = (post: Post) => {
    setPost(post);
    setOpenDeleteDialog(true);
  };

  return (
    <div>
      <Table className="border mt-3">
        <TableCaption>Post List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow
              key={post._id}
              className={`${index % 2 === 0 && "bg-blue-50"}`}
            >
              <TableCell>{post._id.substring(0, 5)}...</TableCell>
              <TableCell className="font-semibold">
                <Link to={`${post.slug}`}>{post.title}</Link>
              </TableCell>
              <TableCell>{post.topic.name}</TableCell>
              <TableCell>{post.author.username}</TableCell>
              <TableCell className="flex gap-3">
                <Edit2
                  onClick={() => handleEdit(post)}
                  className="cursor-pointer"
                  size={18}
                  color="orange"
                />
                <Trash2
                  className="cursor-pointer"
                  color="red"
                  size={18}
                  onClick={() => showDialog(post)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total posts</TableCell>
            <TableCell>{posts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {post && (
        <DeletePostDialog
          setPost={setPost}
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          post={post}
        />
      )}
    </div>
  );
}

export default PostList;
