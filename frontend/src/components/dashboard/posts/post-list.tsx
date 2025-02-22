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
import { Edit2Icon, Loader, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import DeletePost from "./delete-post";
import { Dispatch, SetStateAction, useState } from "react";
import Post from "@/types/Post";

function DashboardPostList({
  setSelectedId,
  setOpen,
}: {
  setSelectedId: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { posts, isLoading } = useSelector(
    (state: RootState) => state.postsReducer
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);

  const handleEdit = (post: Post) => {
    setSelectedId(post._id);
    setOpen(true);
  };

  const handleDelete = (post: Post) => {
    setPost(post);
    setOpenDeleteDialog(true);
  };
  return (
    <>
      <Table className="border">
        <TableCaption>Post List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identifier</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Loader className="animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>{post._id.substring(0, 6)}...</TableCell>
                <TableCell>{post.message.substring(0, 40)}</TableCell>
                <TableCell className="font-medium">
                  {post.author.username}
                </TableCell>
                <TableCell className="flex gap-2 cursor-pointer">
                  <Edit2Icon
                    className="w-4"
                    color="orange"
                    onClick={() => handleEdit(post)}
                  />
                  <Trash2
                    color="red"
                    className="w-4 cursor-pointer"
                    onClick={() => handleDelete(post)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={3}>{posts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {post && (
        <DeletePost
          post={post}
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
        />
      )}
    </>
  );
}

export default DashboardPostList;
