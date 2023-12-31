import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <div className="p-3 overflow-x-hidden">{children}</div>;
}
