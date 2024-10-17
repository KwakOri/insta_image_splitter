import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { TImageUrls } from "../types";

interface ImageGridProps {
  imageUrls: TImageUrls;
}

const ImageGrid = ({ imageUrls }: ImageGridProps) => {
  const [downloadedImages, setDownloadedImages] = useState<number[]>([]);
  const updateDownloadedImages = (index: number) => {
    setDownloadedImages([...downloadedImages, index]);
  };

  return (
    <>
      {imageUrls.length > 0 ? (
        <div className=" grid grid-cols-3">
          {imageUrls.map((url, index) => (
            <>
              {downloadedImages.includes(index) ? (
                <div key={index} className="relative border border-white">
                  <div className="absolute z-10 w-full h-full flex justify-center items-center">
                    <div className="absolute z-20">
                      <FaCheckCircle fill={"white"} size={100} />
                    </div>
                    <div className="absolute w-full h-full bg-black opacity-50"></div>
                  </div>
                  <img
                    className="w-full"
                    src={url}
                    alt={`Piece ${index + 1}`}
                  />
                </div>
              ) : (
                <div
                  onClick={() => updateDownloadedImages(index)}
                  key={index}
                  className="border border-white"
                >
                  <a href={url} download={`piece_${index + 1}.png`}>
                    <img
                      className="w-full"
                      src={url}
                      alt={`Piece ${index + 1}`}
                    />
                  </a>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <div className="w-full aspect-square bg-white"></div>
      )}
    </>
  );
};

export default ImageGrid;
