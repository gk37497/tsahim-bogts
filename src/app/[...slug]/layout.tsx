import { PropsWithChildren } from "react";
import MainLayout from "../views/main-layout";

export default function layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
