import FormControl from "@/types/FormControl";

export const PostFormData: FormControl[] = [
  {
    label: "Title",
    name: "title",
    placeholder: "Title",
    componentType: "input",
    type: "text",
    required: false,
  },
  {
    label: "Slug",
    name: "slug",
    placeholder: "Slug",
    componentType: "input",
    type: "text",
    required: false,
  },
  {
    label: "Subtitle",
    name: "subtitle",
    placeholder: "Subtitle",
    componentType: "input",
    type: "text",
    required: false,
  },
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

export const DashboardProfileDetailsFormControls: FormControl[] = [
  {
    label: "Username",
    name: "username",
    placeholder: "Username",
    componentType: "input",
    type: "text",
    required: false,
  },
  {
    label: "Firstname",
    name: "firstname",
    placeholder: "Firstname",
    componentType: "input",
    type: "text",
    required: false,
  },
  {
    label: "Lastname",
    name: "lastname",
    placeholder: "Lastname",
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
];

export const DashboardProfilePasswordFormControls: FormControl[] = [
  {
    label: "Current Password",
    name: "currentPassword",
    placeholder: "********",
    componentType: "input",
    type: "password",
    required: false,
  },
  {
    label: "New Password",
    name: "newPassword",
    placeholder: "********",
    componentType: "input",
    type: "password",
    required: false,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "********",
    componentType: "input",
    type: "password",
    required: false,
  },
];
