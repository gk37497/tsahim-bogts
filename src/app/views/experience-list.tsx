import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

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

export default function ExperienceList({
  data: articles,
  children,
}: {
  data: Experience[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 grid">
        {articles?.map((article) => (
          <ExperienceCard article={article} key={article.id} />
        ))}
      </div>
      {children && children}
    </section>
  );
}

function ExperienceCard({ article }: { article: Experience }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover?.data?.attributes.url
  );
  const authorsBio = article.attributes.authorsBio?.data?.attributes;
  const avatarUrl = getStrapiMedia(authorsBio?.avatar.data.attributes.url);

  return (
    <Link
      href={`/experiences/${article.attributes.slug}`}
      key={article.id}
      className="max-w-sm mx-auto w-full h-full group hover:no-underline focus:no-underline bg-white rounded-md overflow-hidden shadow-md"
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