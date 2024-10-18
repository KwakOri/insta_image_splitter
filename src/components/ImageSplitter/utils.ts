import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadAllImagesWithBase64 = async (imageUrls: string[]) => {
  const zip = new JSZip();

  imageUrls.forEach((imageUrl, index) => {
    const imgData = imageUrl.split(",")[1]; // Base64 데이터 추출
    zip.file(`piece_${index + 1}.png`, imgData, { base64: true });
  });

  // ZIP 파일을 Blob 형태로 생성 후 다운로드
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "images.zip");
  });
};

export const downloadAllImagesWithBlob = async (imageUrls: string[]) => {
  const zip = new JSZip();

  // imageUrls.forEach((url, index) => {
  //   const imgData = url.split(",")[1]; // Base64 데이터 추출
  //   zip.file(`piece_${index + 1}.png`, imgData, { base64: true });
  // });

  for (let index = 0; index < imageUrls.length; index++) {
    const response = await fetch(imageUrls[index]);
    const blob = await response.blob();
    zip.file(`piece_${index + 1}.png`, blob);
  }

  // ZIP 파일을 Blob 형태로 생성 후 다운로드
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "images.zip");
  });
};

export const downloadAllImagesAtDesktop = (imageUrls: string[]) => {
  imageUrls.forEach((imageUrl, i) => {
    const anchorElement = document.createElement("a");
    document.body.appendChild(anchorElement);
    anchorElement.download = `image_${i + 1}`; // a tag에 download 속성을 줘서 클릭할 때 다운로드가 일어날 수 있도록 하기
    anchorElement.href = imageUrl; // href에 url 달아주기
    anchorElement.click(); // 코드 상으로 클릭을 해줘서 다운로드를 트리거
    document.body.removeChild(anchorElement); // cleanup - 쓰임을 다한 a 태그 삭제
  });
};
