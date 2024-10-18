"use client";

import { useImage } from "@/contexts/Image.context";
import { ImageCropper } from "../ImageCropper";
import { ImageInput } from "../ImageInput";
import { ImageSplitter } from "../ImageSplitter";

const ImageContainer = () => {
  const { step } = useImage();
  return (
    <section className="relative overflow-scroll max-w-[600px] w-full px-8 py-8 h-full flex flex-col">
      {step === "select" && <ImageInput />}
      {step === "crop" && <ImageCropper />}
      {step === "done" && <ImageSplitter />}
    </section>
  );
};

export default ImageContainer;
