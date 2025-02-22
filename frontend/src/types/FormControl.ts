export default interface FormControl {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "password" | "datetime" | "date" | "email" | "number";
  required: boolean;
  componentType: "input" | "textarea" | "select";
  options?: FormControlOption[];
}

export interface FormControlOption {
  label: string;
  value: string;
}
