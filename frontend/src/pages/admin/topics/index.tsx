import TopicForm from "@/components/admin/topics/TopicForm";
import TopicList from "@/components/admin/topics/TopicList";
import { Button } from "@/components/ui/button";
import Topic, { initialTopicState } from "@/types/Topic";
import { useState } from "react";

function AdminTopics() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [data, setData] = useState<Topic>(initialTopicState);

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize mb-5">Topics lists</h1>
      <TopicList
        setSelectedId={setSelectedId}
        setOpen={setOpenForm}
        setData={setData}
      />
      <Button
        className="float-end"
        onClick={() => setOpenForm(!openForm)}
        variant="outline"
      >
        Add topic
      </Button>
      <TopicForm
        open={openForm}
        setOpen={setOpenForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default AdminTopics;
