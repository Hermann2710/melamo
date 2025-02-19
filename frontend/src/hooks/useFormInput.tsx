import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function handleChangeInput(
  e: ChangeEvent<HTMLInputElement>,
  setData: Dispatch<SetStateAction<any>>
) {
  const { name, value } = e.target;
  setData((prev: any) => ({
    ...prev,
    [name]: value,
  }));
}

export function handleChangeTextarea(
  e: ChangeEvent<HTMLTextAreaElement>,
  setData: Dispatch<SetStateAction<any>>
) {
  const { name, value } = e.target;
  setData((prev: any) => ({
    ...prev,
    [name]: value,
  }));
}
