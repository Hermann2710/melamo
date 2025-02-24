import axios, { AxiosError } from "axios";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type UploadImageFormProps = {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
};

function UploadImageForm({ imageUrl, setImageUrl }: UploadImageFormProps) {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadImage = async () => {
    if (!uploadImage) {
      return toast.error("You must select an image", {
        closeButton: true,
      });
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", uploadImage!);
      const response = await axios.post("/api/upload-image", formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        setImageUrl(response.data.path as string);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response!.data.message, {
          closeButton: true,
        });
      } else if (error instanceof Error) {
        return toast.error(error.message, { closeButton: true });
      } else {
        return toast.error(error as string, { closeButton: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setUploadImage(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setUploadImage(droppedFile);
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadImage(null);
    setImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    uploadImage !== null && handleUploadImage();
  }, [uploadImage]);

  return (
    <div className="w-full max-w-72">
      <Label
        className="text-lg font-semibold mb-2 block"
        htmlFor="image-upload"
      >
        Upload image
      </Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          onChange={handleChangeImage}
          id="image-upload"
          name="image"
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
        />
        {uploadImage ? (
          <div className="flex items-center justify-between gap-2 p-3 border-2 rounded-lg">
            <div className="flex items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Avatar>
                    <AvatarFallback>UI</AvatarFallback>
                    <AvatarImage src={URL.createObjectURL(uploadImage)} />
                  </Avatar>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{uploadImage.name}</DialogTitle>
                    <DialogDescription>Uploaded image</DialogDescription>
                  </DialogHeader>
                  <img
                    className="w-52 m-auto block"
                    src={URL.createObjectURL(uploadImage)}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm font-medium">{uploadImage.name}</p>
            <Button
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemove}
              variant="ghost"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        ) : (
          <Label
            className="flex flex-col border rounded-lg items-center justify-center h-32 cursor-pointer"
            htmlFor="image-upload"
          >
            <UploadIcon className="w-8 h-8 mb-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Dag & drop or click to upload image
            </span>
          </Label>
        )}
      </div>
    </div>
  );
}

export default UploadImageForm;
