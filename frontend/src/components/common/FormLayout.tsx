import { Dispatch, FormEvent, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { FormControl } from "@/config/forms";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { handleChangeInput, handleChangeTextarea } from "@/hooks/useFormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormLayoutProps {
  formControls: FormControl[];
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEditMode: boolean;
  sheetTitle: string;
  sheetDescription?: string;
}

function FormLayout({
  formControls,
  formData,
  setFormData,
  onSubmit,
  onReset,
  open,
  setOpen,
  isEditMode,
  sheetTitle,
  sheetDescription,
}: FormLayoutProps) {
  function renderFormControl(formControl: FormControl) {
    let element = <></>;
    const value = formData[formControl.name];
    switch (formControl.componentType) {
      case "input":
        element = (
          <Input
            className="mt-1"
            name={formControl.name}
            id={formControl.name}
            placeholder={formControl.placeholder}
            required={formControl.required}
            value={value}
            type={formControl.type}
            onChange={(e) => handleChangeInput(e, setFormData)}
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            className="mt-1"
            name={formControl.name}
            id={formControl.name}
            placeholder={formControl.placeholder}
            required={formControl.required}
            value={value}
            onChange={(e) => handleChangeTextarea(e, setFormData)}
          />
        );
        break;
      case "select":
        element = (
          <Select name={formControl.name} value={value}>
            <SelectTrigger>
              <SelectValue placeholder={formControl.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formControl.options?.map((item) => (
                <SelectItem value={item.value} key={item.label}>
                  <SelectValue placeholder={item.label} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;
      default:
        element = (
          <Input
            className="mt-1"
            name={formControl.name}
            id={formControl.name}
            placeholder={formControl.placeholder}
            required={formControl.required}
            value={value}
            type={formControl.type}
            onChange={(e) => handleChangeInput(e, setFormData)}
          />
        );
    }
    return element;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <SheetHeader>
            <SheetTitle>
              {isEditMode ? "Update" : "Add"}&nbsp;{sheetTitle}
            </SheetTitle>
            <SheetDescription>{sheetDescription}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            {formControls.map((item) => (
              <div key={item.name}>
                <Label htmlFor={item.name}>{item.label}</Label>
                {renderFormControl(item)}
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button type="reset" onClick={onReset}>Reset</Button>
            <Button type="submit">{isEditMode ? "Update" : "Add"}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default FormLayout;
