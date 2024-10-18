import { useImage } from "@/contexts/Image.context";
import { FaImage } from "react-icons/fa";

const ImageInput = () => {
  const { handleImageUpload } = useImage();
  return (
    <div className="w-full h-full flex items-center">
      <label
        className="w-full h-40 border border-white flex flex-col justify-center items-center border-dashed rounded-lg font-light cursor-pointer hover:bg-white/5"
        htmlFor="image"
      >
        <p className="text-white font-semibold">이미지를 넣어주세요</p>
        <FaImage fill="white" size="60" />
      </label>
      <input
        className="hidden"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageInput;
