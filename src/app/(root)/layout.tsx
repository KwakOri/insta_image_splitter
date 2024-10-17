import ImageProvider from "@/contexts/Image.context";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ImageProvider>{children}</ImageProvider>
    </>
  );
};

export default RootLayout;
