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

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline dark:bg-[#0245A3] dark:text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline dark:bg-gray-100 dark:text-gray-900";
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {

  return (
    <div className="p-4 rounded-lg bg-white min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Төрлүүд</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
          {categories.map((category: Category) => {
            if (category.attributes.articles.data.length === 0) return null;
            return (
              <Link
                href={`/news/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/"} className={selectedFilter("", "filter")}>
            #Бүгд
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Санал болгох</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/news/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      "text-[#0245A3]"
                    }  hover:underline hover:text-[#0245A3] transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
