export interface SelectOptions {
  label: string;
  value: string;
}

export interface FormControl {
  name: string;
  label: string;
  type?: "email" | "text" | "password" | "number";
  placeholder: string;
  required: boolean;
  componentType: "input" | "select" | "textarea";
  options?: SelectOptions[];
}

export const TopicsFormControl: FormControl[] = [
  {
    name: "name",
    label: "Topic's Name",
    type: "text",
    placeholder: "Topic's name",
    required: true,
    componentType: "input",
  },
  {
    name: "slug",
    label: "Topic's Slug",
    type: "text",
    placeholder: "Topic's slug",
    required: true,
    componentType: "input",
  },
  {
    name: "description",
    label: "Topic's Description",
    placeholder: "Topic's description",
    required: true,
    componentType: "textarea",
  },
];
