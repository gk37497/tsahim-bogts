"use client";
import MobileCategoryList from "@/app/components/MobileCategoryList";
import { fetchAPI } from "@/app/utils/fetch-api";
import MobileBlogList from "@/app/views/mobile/blog-list";
import { useCallback, useEffect, useState } from "react";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function News() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async function fetchSideMenuData() {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const options = { headers: { Authorization: `Bearer ${token}` } };

      const categoriesResponse = await fetchAPI(
        "/categories",
        { populate: "*" },
        options
      );

      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    fetchCategories();
  }, [fetchData, fetchCategories]);

  if (isLoading) return null;

  return (
    <div className="pb-12">
      <MobileCategoryList categories={categories} />
      <MobileBlogList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-gray-200 dark:text-gray-900"
              onClick={loadMorePosts}
            >
              Цааш үзэх
            </button>
          </div>
        )}
      </MobileBlogList>
    </div>
  );
}
