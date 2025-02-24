import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { onInputTextChange, onTextareaChange } from "@/config/formEventHandler";
import FormControl from "@/types/FormControl";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

type DashboardProfileDetailsProps = {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  handleSubmit: (e: SyntheticEvent) => void;
  title: string;
  formControls: FormControl[];
};

function DashboardSettingsForm({
  data,
  setData,
  handleSubmit,
  title,
  formControls,
}: DashboardProfileDetailsProps) {
  function renderFormControl(formControl: FormControl) {
    let element = <></>;
    let val = data[formControl.name];
    switch (formControl.componentType) {
      case "input":
        element = (
          <Input
            placeholder={formControl.placeholder}
            type={formControl.type}
            name={formControl.name}
            id={formControl.name}
            required={formControl.required}
            value={val}
            onChange={(e) => onInputTextChange(e, setData)}
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={formControl.name}
            id={formControl.name}
            placeholder={formControl.placeholder}
            required={formControl.required}
            value={val}
            onChange={(e) => onTextareaChange(e, setData)}
          />
        );
        break;

      default:
        break;
    }
    return element;
  }

  return (
    <div>
      <h1 className="font-medium mt-1 text-lg mb-4">Update your profile {title}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div key={control.label}>
            <Label htmlFor={control.name}>{control.label}</Label>
            {renderFormControl(control)}
          </div>
        ))}
        <Button type="submit" className="w-fit">
          Save changes
        </Button>
      </form>
    </div>
  );
}

export default DashboardSettingsForm;
