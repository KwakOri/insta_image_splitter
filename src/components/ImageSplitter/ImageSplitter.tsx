"use client";

import { useImage } from "@/contexts/Image.context";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import ImageGrid from "./ImageGrid";

function ImageSplitter() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { croppedImageUrl, back, reset } = useImage();

  const downloadAllImages = () => {
    const zip = new JSZip();
    imageUrls.forEach((url, index) => {
      const imgData = url.split(",")[1]; // Base64 데이터 추출
      zip.file(`piece_${index + 1}.png`, imgData, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

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
      <Button onClick={downloadAllImages}>한 번에 다운받기</Button>
      <Button onClick={back}>다시 자르기</Button>
      <Button onClick={reset}>홈으로 가기</Button>
    </>
  );
}

export default ImageSplitter;
