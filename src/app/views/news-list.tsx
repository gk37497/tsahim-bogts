import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function NewsList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="flex flex-col space-y-4">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
      {children && children}
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url
  );

  const category = article.attributes.category.data?.attributes;
  const authorsBio = article.attributes.authorsBio.data?.attributes;

  return (
    <Link
      href={`/news/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className="w-full group hover:no-underline focus:no-underline bg-white rounded-sm overflow-hidden shadow-md hover:bg-gray-100 duration-200 flex flex-col md:flex-row"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-contain group-hover:scale-105 group-focus:scale-105 duration-200 rounded-sm"
          src={imageUrl}
        />
      )}
      <div className="p-6 space-y-2 relative">
        <h3 className="text-xl font-semibold group-hover:underline group-focus:underline duration-200">
          {article.attributes.title}
        </h3>

        <div className="py-1">
          <span className="rounded-md py-1 bg-gray-200 px-1 text-sm shadow-md">
            {category.name}
          </span>
        </div>

        {authorsBio && (
          <div className="text-xs dark:text-gray-400">{authorsBio.name}</div>
        )}
        <span className="text-xs dark:text-gray-400">
          {formatDate(article.attributes.publishedAt)}
        </span>

        <p className="py-2 text-sm">{article.attributes.description}</p>
      </div>
    </Link>
  );
}
