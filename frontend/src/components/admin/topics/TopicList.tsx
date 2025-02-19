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
import Topic from "@/types/Topic";
import { Edit2, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import DeleteTopicDialog from "./DeleteTopicDialog";
import { Link } from "react-router-dom";

type TopicListProps = {
  setSelectedId: React.Dispatch<SetStateAction<string>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<Topic>>;
};

function TopicList({ setSelectedId, setOpen, setData }: TopicListProps) {
  const { topics } = useSelector((state: RootState) => state.topics);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = (topic: Topic) => {
    setSelectedId(topic._id);
    setData(topic);
    setOpen(true);
  };

  const showDialog = (topic: Topic) => {
    setTopic(topic);
    setOpenDeleteDialog(true);
  };

  return (
    <div>
      <Table className="border mt-3">
        <TableCaption>Topic List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Total Posts</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic, index) => (
            <TableRow
              key={topic._id}
              className={`${index % 2 === 0 && "bg-blue-50"}`}
            >
              <TableCell>{topic._id.substring(0, 5)}...</TableCell>
              <TableCell className="font-semibold">
                <Link to={`${topic.slug}`}>{topic.name}</Link>
              </TableCell>
              <TableCell>{topic.totalPosts}</TableCell>
              <TableCell className="flex gap-3">
                <Edit2
                  onClick={() => handleEdit(topic)}
                  className="cursor-pointer"
                  size={18}
                  color="orange"
                />
                <Trash2
                  className="cursor-pointer"
                  color="red"
                  size={18}
                  onClick={() => showDialog(topic)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Topics</TableCell>
            <TableCell>{topics.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {topic && (
        <DeleteTopicDialog
          setTopic={setTopic}
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          topic={topic}
        />
      )}
    </div>
  );
}

export default TopicList;
