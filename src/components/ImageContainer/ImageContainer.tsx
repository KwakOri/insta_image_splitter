"use client";

import { useImage } from "@/contexts/Image.context";
import { ImageCropper } from "../ImageCropper";
import { ImageInput } from "../ImageInput";
import { ImageSplitter } from "../ImageSplitter";

const ImageContainer = () => {
  const { step } = useImage();
  return (
    <section className="max-w-[600px] w-full px-8 h-full flex flex-col justify-center">
      {step === "select" && <ImageInput />}
      {step === "crop" && <ImageCropper />}
      {step === "done" && <ImageSplitter />}
    </section>
  );
};

export default ImageContainer;
