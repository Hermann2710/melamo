import FormControl from "@/types/FormControl";

export const PostFormData: FormControl[] = [
  {
    label: "Message",
    name: "message",
    placeholder: "Message",
    componentType: "textarea",
    required: false,
  },
];

export const AdminUpdateUserFormData: FormControl[] = [
  {
    label: "Username",
    name: "username",
    placeholder: "Username",
    componentType: "input",
    type: "text",
    required: false,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Email",
    componentType: "input",
    type: "email",
    required: false,
  },
  {
    label: "Role",
    name: "role",
    placeholder: "Role",
    componentType: "select",
    required: true,
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" },
    ],
  },
];
