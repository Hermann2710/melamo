import FormLayout from "@/components/common/FormLayout";
import { FormControl, PostsFormControls, SelectOptions } from "@/config/forms";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch, RootState } from "@/store";
import { addPost, editPost } from "@/store/posts";
import { fetchTopics } from "@/store/topics";
import Post, { initialPostState } from "@/types/Post";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PostFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Post;
  setData: React.Dispatch<React.SetStateAction<Post>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

function PostForm({
  open,
  setOpen,
  data,
  setData,
  selectedId,
  setSelectedId,
}: PostFormProps) {
  const [controls, setControls] = useState<FormControl[]>([]);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { topics } = useSelector((state: RootState) => state.topics);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedId) {
      dispatch(editPost({ id: selectedId, data: data })).then((action) => {
        if (action.payload.success) {
          setData(initialPostState);
          setOpen(!open);
          setSelectedId("");
          return toast({
            title: action.payload.message,
          });
        } else {
          return toast({
            title: action.payload.message,
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(addPost(data)).then((action) => {
        if (action.payload.success) {
          setData(initialPostState);
          setOpen(!open);
          dispatch(fetchTopics());
          return toast({
            title: action.payload.message,
          });
        } else {
          return toast({
            title: action.payload.message,
            variant: "destructive",
          });
        }
      });
    }
  };

  const handleReset = () => {
    setData(initialPostState);
    setSelectedId("");
  };

  useEffect(() => {
    const options: SelectOptions[] = [];
    topics.map((topic) => {
      let option: SelectOptions = {
        label: topic.name,
        value: topic._id,
      };
      options.push(option);
    });
    const select: FormControl = {
      name: "topic",
      label: "Topic's name",
      placeholder: "Topic's name",
      required: true,
      options: options,
      componentType: "select",
    };
    setControls([select, ...PostsFormControls]);
    setData((prev) => ({ ...prev, author: user?._id }));
    setData((prev) => ({
      ...prev,
      topic: topics.length > 0 ? topics[0]._id : "",
    }));
  }, [topics, user]);

  return (
    <FormLayout
      open={open}
      setOpen={setOpen}
      formData={data}
      setFormData={setData}
      sheetTitle="post form"
      formControls={controls}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isEditMode={selectedId !== ""}
    />
  );
}

export default PostForm;
