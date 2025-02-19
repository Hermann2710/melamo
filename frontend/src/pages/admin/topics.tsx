import FormLayout from "@/components/common/FormLayout";
import { Button } from "@/components/ui/button";
import { TopicsFormControl } from "@/config/forms";
import { useState } from "react";

const initialState = {
  name: "",
  slug: "",
  description: "",
  yo: "",
};

function AdminTopics() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState(initialState);
  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Add Topic</Button>
      <FormLayout
        formControls={TopicsFormControl}
        formData={data}
        setFormData={setData}
        onSubmit={() => {}}
        open={open}
        setOpen={setOpen}
        sheetTitle="category form"
        sheetDescription="Description"
        isEditMode={false}
      />
    </div>
  );
}

export default AdminTopics;
