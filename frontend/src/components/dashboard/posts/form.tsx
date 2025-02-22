import { PostFormData } from "@/config/forms";
import DashboardForm from "../form";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Post, { initialPostData } from "@/types/Post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createPost, updatePost } from "@/store/posts";
import { toast } from "sonner";

type PostFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
};

function PostForm({ open, setOpen, selectedId, setSelectedId }: PostFormProps) {
  const [post, setPost] = useState<Post>(initialPostData);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { posts } = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedId !== "") {
      dispatch(updatePost({ id: selectedId, data: post })).then((action) => {
        if (action.payload.success) {
          setOpen(false);
          setSelectedId("");
          setPost(initialPostData);
          toast.success(action.payload.message, {
            closeButton: true,
          });
        } else {
          toast.error(action.payload.message, {
            closeButton: true,
          });
        }
      });
    } else {
      dispatch(createPost(post)).then((action) => {
        if (action.payload.success) {
          setOpen(false);
          setPost(initialPostData);
          toast.success(action.payload.message, {
            closeButton: true,
          });
        } else {
          toast.error(action.payload.message, {
            closeButton: true,
          });
        }
      });
    }
  };

  useEffect(() => {
    if(selectedId) {
      posts.map((post) => {
        if(post._id === selectedId) {
          setPost(post);
        }
      })
    }
    setPost((prev) => ({
      ...prev,
      author: user?._id,
    }));
  }, [open]);

  return (
    <DashboardForm
      formControls={PostFormData}
      data={post}
      setData={setPost}
      formTitle="post"
      open={open}
      setOpen={setOpen}
      handleSubmit={handleSubmit}
      isEditMode={selectedId !== ""}
    />
  );
}

export default PostForm;
