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

export default function CategoryList({
  categories,
  filter,
}: {
  categories: Category[];
  filter?: string;
}) {
  return (
    <ul className="items-stretch space-x-5 flex mb-4 container mx-auto px-4">
      <li
        className={`flex duration-200 capitalize p-4 ${
          filter === undefined
            ? "text-[#0245A3] font-bold border-b-[#0245A3] border-b"
            : "text-black"
        }`}
      >
        <Link href={`/news`}>
          <h2>Бүгд</h2>
        </Link>
      </li>

      {categories.map((category) => (
        <li
          className={`flex duration-200 capitalize p-4 ${
            category.attributes.slug === filter
              ? "text-[#0245A3] font-bold border-b-[#0245A3] border-b"
              : "text-black"
          }`}
          key={category.id}
        >
          <Link href={`/news/${category.attributes.slug}`}>
            <h2>{category.attributes.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
