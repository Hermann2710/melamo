import React from "react";

export function onInputTextChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value } = e.target;
  setData((prev: any) => ({
    ...prev,
    [name]: value,
  }));
}

export function onTextareaChange(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setData: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value } = e.target;
  setData((prev: any) => ({
    ...prev,
    [name]: value,
  }));
}
