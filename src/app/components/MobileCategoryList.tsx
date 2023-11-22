import { NewspaperIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

export default function MobileCategoryList({
  categories,
  filter,
}: {
  categories: Category[];
  filter?: string;
}) {
  return (
    <ul className="space-x-2 flex mb-4 container mx-auto justify-around">
      {categories?.slice(0, 2)?.map((category, i) => (
        <li
          className={`flex rounded-sm items-center space-x-3 uppercase p-2 w-full justify-center ${
            category.attributes.slug === filter
              ? "text-gray-100 bg-gray-800"
              : "text-black bg-gray-200"
          }`}
          key={category.id}
        >
          {i === 0 && <NewspaperIcon className="w-5 h-5" />}
          {i === 1 && <VideoCameraIcon className="w-5 h-5" />}

          <Link href={`/mobile/news/${category.attributes.slug}`}>
            <h2>{category.attributes.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
