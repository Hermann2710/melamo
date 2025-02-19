import { RootState } from "@/store";
import Topic from "@/types/Topic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AdminTopicsDetails() {
  const { slug } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const { topics } = useSelector((state: RootState) => state.topics);

  useEffect(() => {
    topics.map((topic) => {
      if (topic.slug === slug) {
        setTopic(topic);
        return;
      }
    });
  }, []);

  if (!topic) {
    return <h1 className="font-bold text-2xl">Topic not found</h1>;
  } else {
    return (
      <div>
        <h1 className="font-bold text-2xl">Topic Details</h1>
        <div className="mt-3">
          <div className="flex items-center gap-1">
            <span>Name:</span>
            <p className="font-semibold">{topic.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Slug:</span>
            <p className="font-semibold">{topic.slug}</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Description:</span>
            <p>{topic.description}</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Created at:</span>
            <p className="font-semibold">
              {new Date(topic.createdAt).toUTCString()}
            </p>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <span className="font-medium">Posts</span>
              <span>{topic.totalPosts}</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTopicsDetails;
