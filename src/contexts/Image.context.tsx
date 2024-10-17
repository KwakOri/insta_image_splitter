"use client";

import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface ImageContextTypes {
  back: () => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  step: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  croppedImageUrl: string;
  setCroppedImageUrl: (url: string) => void;
}

const initialValue: ImageContextTypes = {
  back: () => {},
  handleImageUpload: () => {},
  reset: () => {},
  step: "",
  imageUrl: "",
  setImageUrl: () => {},
  croppedImageUrl: "",
  setCroppedImageUrl: () => {},
};

const ImageContext = createContext<ImageContextTypes>(initialValue);

export const useImage = () => useContext(ImageContext);

const ImageProvider = ({ children }: PropsWithChildren) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const step = croppedImageUrl ? "done" : imageUrl ? "crop" : "select";
  const reset = () => {
    setImageUrl("");
    setCroppedImageUrl("");
  };
  const back = () => {
    if (step === "select") return alert("뒤로 갈 수 없습니다.");
    if (step === "crop") return reset();
    if (step === "done") return setCroppedImageUrl("");
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
  };

  const value: ImageContextTypes = {
    back,
    reset,
    handleImageUpload,
    step,
    imageUrl,
    setImageUrl,
    croppedImageUrl,
    setCroppedImageUrl,
  };
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

export default ImageProvider;
