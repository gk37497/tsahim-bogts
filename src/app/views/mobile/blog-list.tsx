import Image from "next/image";
import Link from "next/link";
import { formatDate, getStrapiMedia } from "../../utils/api-helpers";

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

export default function MobileBlogList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="space-y-6 sm:space-y-12">
      <div className="flex flex-col space-y-6">
        {articles.map((article) => (
          <MobileArticleCard article={article} key={article.id} />
        ))}
      </div>
      {children && children}
    </section>
  );
}

export function MobileArticleCard({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url
  );

  const category = article.attributes.category.data?.attributes;

  return (
    <Link
      href={`/mobile/news/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className="w-full focus:no-underline bg-white rounded-sm shadow-sm border border-gray-300"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-cover w-full h-40"
          src={imageUrl}
        />
      )}
      <div className="px-6 py-3 space-y-2 relative">
        <h3 className="text-lg font-light">{article.attributes.title}</h3>

        <div className="flex justify-between items-center">
          <span className="text-xs dark:text-gray-400">
            {formatDate(article.attributes.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
