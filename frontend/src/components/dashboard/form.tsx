import FormControl from "@/types/FormControl";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { onInputTextChange, onTextareaChange } from "@/config/formEventHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DashboardFormProps = {
  formControls: FormControl[];
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  isEditMode: boolean;
  formTitle: string;
  formDescription?: string;
  handleSubmit: (e: SyntheticEvent) => void;
};

function DashboardForm({
  formControls,
  data,
  setData,
  setOpen,
  open,
  isEditMode,
  formTitle,
  formDescription,
  handleSubmit,
}: DashboardFormProps) {
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
      case "select":
        element = (
          <Select
          value={val}
            onValueChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                [formControl.name]: e,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={formControl.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formControl.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      default:
        break;
    }
    return element;
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mb-4">
            <SheetTitle>
              {isEditMode ? "Update" : "Add"} {formTitle}
            </SheetTitle>
            {SheetDescription && (
              <SheetDescription>{formDescription}</SheetDescription>
            )}
          </SheetHeader>
          {formControls.map((control) => (
            <div className="flex flex-col gap-2" key={control.label}>
              <Label htmlFor={control.name}>{control.label}</Label>
              {renderFormControl(control)}
            </div>
          ))}
          <SheetFooter className="mt-3">
            <Button type="submit" className="w-full">
              {isEditMode ? "Update" : "Add"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default DashboardForm;
