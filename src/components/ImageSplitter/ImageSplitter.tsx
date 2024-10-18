"use client";

import { useImage } from "@/contexts/Image.context";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import ImageGrid from "./ImageGrid";
import { downloadAllImagesAtDesktop, downloadAllImagesWithBlob } from "./utils";

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
      <Button onClick={() => downloadAllImagesWithBlob(imageUrls)}>
        ZIP으로 압축해서 다운받기
      </Button>
      <Button onClick={() => downloadAllImagesAtDesktop(imageUrls)}>
        PNG로 한 번에 다운받기(Desktop Only)
      </Button>
      <p className="text-white mt-4">
        &quot;PNG로 한 번에 다운받기&quot;는 모바일에서 작동하지 않습니다.
      </p>

      <Button onClick={back}>다시 자르기</Button>
      <Button onClick={reset}>홈으로 가기</Button>
    </>
  );
}

export default ImageSplitter;
