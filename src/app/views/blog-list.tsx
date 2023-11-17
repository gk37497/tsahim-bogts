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

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  const bigArticles = articles.slice(0, 3);
  const smallArticles = articles.slice(3);

  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="space-y-5 hidden md:block">
        <div>
          <ArticleCardBig article={bigArticles[0]} index={0} />
        </div>
        <div className="flex-row flex space-x-5">
          <ArticleCardBig article={bigArticles[1]} index={1} />
          <ArticleCardBig article={bigArticles[2]} index={2} />
        </div>
      </div>

      <div className="justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 hidden md:grid">
        {smallArticles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>

      <div className="grid md:hidden justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

  const avatarUrl = getStrapiMedia(authorsBio?.avatar.data.attributes.url);

  return (
    <Link
      href={`/news/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className="max-w-sm mx-auto w-full h-full group hover:no-underline focus:no-underline bg-white rounded-2xl overflow-hidden shadow-lg"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-cover w-full h-44 "
          src={imageUrl}
        />
      )}
      <div className="p-6 space-y-2 relative">
        {avatarUrl && (
          <Image
            alt="avatar"
            width="80"
            height="80"
            src={avatarUrl}
            className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
          />
        )}

        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {article.attributes.title}
        </h3>

        <div className="py-1">
          <span className="rounded-md py-1 bg-gray-200 px-1 text-sm shadow-md">
            {category.name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs dark:text-gray-400">
            {formatDate(article.attributes.publishedAt)}
          </span>
          {authorsBio && (
            <span className="text-xs dark:text-gray-400">
              {authorsBio.name}
            </span>
          )}
        </div>
        <p className="py-4">{article.attributes.description}</p>
      </div>
    </Link>
  );
}

function ArticleCardBig({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url
  );

  const category = article.attributes.category.data?.attributes;

  return (
    <Link
      href={`/news/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className={`hover:no-underline overflow-hidden focus:no-underline rounded-lg shadow-lg flex flex-row w-full ${
        index === 0 && "lg:h-[500px]"
      }`}
    >
      <div className="w-3/5 relative">
        {imageUrl && (
          <Image
            alt="presentation"
            className={`object-cover`}
            src={imageUrl}
            fill
          />
        )}
      </div>

      <div className="p-6 space-y-2 relative w-2/5">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {article.attributes.title}
        </h3>

        <div className="py-1">
          <span className="rounded-md py-1 bg-gray-200 px-1 text-sm shadow-md">
            {category.name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs dark:text-gray-400">
            {formatDate(article.attributes.publishedAt)}
          </span>
        </div>
        <p className="py-4">{article.attributes.description}</p>
      </div>
    </Link>
  );
}
