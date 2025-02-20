import React, { SetStateAction } from "react";
import FormLayout from "../../common/FormLayout";
import { TopicsFormControl } from "@/config/forms";
import Topic, { initialTopicState } from "@/types/Topic";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addTopic, editTopic } from "@/store/topics";
import { useToast } from "@/hooks/use-toast";

type TopicFormProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: React.Dispatch<SetStateAction<string>>;
  data: Topic;
  setData: React.Dispatch<SetStateAction<Topic>>;
};

function TopicForm({
  open,
  setOpen,
  selectedId,
  setSelectedId,
  data,
  setData,
}: TopicFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedId) {
      dispatch(editTopic({ id: selectedId, data: data })).then((action) => {
        if (action.payload.success) {
          setData(initialTopicState);
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
      dispatch(addTopic(data)).then((action) => {
        if (action.payload.success) {
          setData(initialTopicState);
          setOpen(!open);
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
    setData(initialTopicState);
    setSelectedId("");
  };

  return (
    <FormLayout
      open={open}
      setOpen={setOpen}
      formData={data}
      setFormData={setData}
      onSubmit={handleSubmit}
      onReset={handleReset}
      formControls={TopicsFormControl}
      sheetTitle="topic form"
      isEditMode={selectedId !== ""}
    />
  );
}

export default TopicForm;
