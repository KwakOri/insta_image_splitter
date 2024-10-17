import { useImage } from "@/contexts/Image.context";
import getCroppedImg from "@/hooks/getCrop";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import Button from "../shared/Button";

const ImageCropper = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const { setCroppedImageUrl, imageUrl, back } = useImage();

  // debouncing function
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg({
        imageSrc: imageUrl,
        pixelCrop: croppedAreaPixels,
      });
      console.log("donee", { croppedImage });
      if (!croppedImage) return;
      setCroppedImageUrl(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="relative w-full aspect-square">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <Button onClick={saveCroppedImage}>저장하기</Button>
      <Button onClick={back}>뒤로가기</Button>
    </>
  );
};

export default ImageCropper;
