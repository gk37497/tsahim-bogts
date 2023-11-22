"use client";
import { formatDate, getStrapiMedia } from "@/app/utils/api-helpers";
import { postRenderer } from "@/app/utils/post-renderer";
import Image from "next/image";
import MobileHeader from "./mobile-header";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
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
    blocks: any[];
    publishedAt: string;
  };
}

export default function MobilePost({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const author = authorsBio.data?.attributes;

  return (
    <article className="bg-white text-gray-900 flex flex-col space-y-5 mt-12">
      <MobileHeader title={title} />

      <h1 className="leading-tight text-2xl md:text-2xl font-semibold">
        {title}
      </h1>
      <div>
        <span className="flex text-sm items-center space-x-2">
          {author && <h6>{author?.name}</h6>}
        </span>
        <span className="text-xs dark:text-gray-800">
          {formatDate(publishedAt)}
        </span>
      </div>

      <div className="w-full h-1 bg-gray-100" />

      <div className="bg-gray-200">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="article cover image"
            width={400}
            height={240}
            className="w-full h-52 object-cover mb-4"
          />
        )}

        <p className="px-2 pb-2 text-sm">{description}</p>
      </div>

      <div className="text-gray-900 bg-white">
        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
    </article>
  );
}
