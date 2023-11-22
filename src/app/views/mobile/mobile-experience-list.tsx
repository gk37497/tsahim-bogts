import { formatDate, getStrapiMedia } from "@/app/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";

interface Experience {
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

export default function MobileExperienceList({
  data: articles,
  children,
}: {
  data: Experience[];
  children?: React.ReactNode;
}) {
  return (
    <section className="space-y-6 sm:space-y-12">
      <div className="flex flex-col space-y-6">
        {articles?.map((article) => (
          <ExperienceCard article={article} key={article.id} />
        ))}
      </div>
      {children && children}
    </section>
  );
}

export function ExperienceCard({ article }: { article: Experience }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url
  );

  return (
    <Link
      href={`/mobile/experiences/${article.attributes.slug}`}
      key={article.id}
      className="w-full mt-16 focus:no-underline bg-white rounded-sm shadow-sm border border-gray-300"
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
