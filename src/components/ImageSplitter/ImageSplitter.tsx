"use client";

import { useImage } from "@/contexts/Image.context";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import ImageGrid from "./ImageGrid";
import { downloadAllImages } from "./utils";

function ImageSplitter() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { croppedImageUrl, back, reset } = useImage();

  useEffect(() => {
    const img = new Image();
    img.src = croppedImageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = img.width / 3;
      const height = img.height / 3;
      const urls: string[] = [];

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          canvas.width = width;
          canvas.height = height;
          if (!ctx) return;
          ctx.drawImage(
            img,
            col * width,
            row * height,
            width,
            height,
            0,
            0,
            width,
            height
          );

          const imgUrl = canvas.toDataURL("image/png");
          urls.push(imgUrl);
        }
      }

      setImageUrls(urls);
    };
  }, []);

  return (
    <>
      <ImageGrid imageUrls={imageUrls} />
      <Button onClick={() => downloadAllImages(imageUrls)}>
        한 번에 다운받기
      </Button>
      <Button onClick={back}>다시 자르기</Button>
      <Button onClick={reset}>홈으로 가기</Button>
    </>
  );
}

export default ImageSplitter;
