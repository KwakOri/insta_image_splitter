import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadAllImages = async (imageUrls: string[]) => {
  const zip = new JSZip();

  // imageUrls.forEach((url, index) => {
  //   const imgData = url.split(",")[1]; // Base64 데이터 추출
  //   zip.file(`piece_${index + 1}.png`, imgData, { base64: true });
  // });

  // 각 이미지 URL을 ZIP 파일로 추가
  for (let i = 0; i < imageUrls.length; i++) {
    const response = await fetch(imageUrls[i]);
    const blob = await response.blob();
    zip.file(`piece_${i + 1}.png`, blob);
  }

  // ZIP 파일을 Blob 형태로 생성 후 다운로드
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "images.zip");
  });
};
