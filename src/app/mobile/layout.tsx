import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="p-3 overflow-hidden max-w-[26rem] mx-auto">{children}</div>
  );
}
