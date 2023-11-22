"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useParams, usePathname, useRouter } from "next/navigation";

const unBackableRoutes = [
  "/mobile/forecast",
  "/mobile",
  "/mobile/news",
  "/mobile/experiences",
];

export default function MobileHeader({ title }: { title: string }) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const isBackable = !unBackableRoutes.includes(pathname);

  return (
    <div className="h-16 p-1 mb-3 flex items-center justify-center bg-white sticky top-0 z-[500] border-b -mx-4 -mt-3">
      {isBackable && (
        <ChevronLeftIcon
          className="w-8 h-8 absolute left-2"
          onClick={() => router.back()}
        />
      )}
      <div className="text-lg max-w-[18rem] text-center font-semibold capitalize line-clamp-1">
        {title}
      </div>
    </div>
  );
}
