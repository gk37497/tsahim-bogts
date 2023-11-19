import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import PageHeader from "../components/PageHeader";
import {
  ArrowDownLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

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
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <ArticleCardBig article={articles[0]} />

      <div className="flex w-full justify-between items-center py-4 md:py-0">
        <PageHeader heading="Шинэ мэдээнүүд" />
        <Link
          href="/news"
          className="hidden md:flex flex-row items-center w-32 justify-between hover:underline"
        >
          <span className="text-sm">Бүгдийг үзэх</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => {
          if (index === 0) {
            return null;
          }
          return <ArticleCard article={article} key={article.id} />;
        })}
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
      className="max-w-sm mx-auto w-full group hover:no-underline focus:no-underline bg-white rounded-sm overflow-hidden shadow-sm hover:bg-gray-100 duration-200"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-cover w-full h-52 group-hover:scale-105 group-focus:scale-105 duration-200"
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

        <h3 className="text-xl font-semibold group-hover:underline group-focus:underline duration-200">
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
        <p className="py-4 text-sm">{article.attributes.description}</p>
      </div>
    </Link>
  );
}

function ArticleCardBig({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover?.data?.attributes.url
  );

  const category = article.attributes.category?.data?.attributes;

  return (
    <Link
      href={`/news/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className={`hover:no-underline overflow-hidden group focus:no-underline rounded-md shadow-lg flex flex-row w-full h-[400px] relative`}
    >
      <div className="w-full relative">
        {imageUrl && (
          <Image
            alt="presentation"
            className={`object-cover group-hover:scale-105 group-focus:scale-105 duration-200`}
            src={imageUrl}
            fill
          />
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-black to-transparent opacity-75" />

      <div className="p-6 space-y-2 absolute bottom-0 text-white right-0 text-right">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {article.attributes.title}
        </h3>

        <div className="py-1">
          <span className="rounded-md py-1 bg-gray-200 px-2 text-sm shadow-md text-black">
            {category.name}
          </span>
        </div>

        <div>
          <span className="text-xs dark:text-gray-200">
            {formatDate(article.attributes.publishedAt)}
          </span>
        </div>
        <p className="py-4">{article.attributes.description}</p>
      </div>
    </Link>
  );
}
