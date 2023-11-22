import MobileCategoryList from "@/app/components/MobileCategoryList";
import { fetchAPI } from "@/app/utils/fetch-api";
import MobileBlogList from "@/app/views/mobile/blog-list";
import MobileHeader from "@/app/views/mobile/mobile-header";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: filter,
        },
      },
      populate: {
        cover: { fields: ["url"] },
        category: {
          populate: "*",
        },
        authorsBio: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

async function fetchSideMenuData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/categories",
      { populate: "*" },
      options
    );

    return {
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

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

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Хоосон</div>;

  const { categories } = (await fetchSideMenuData()) as {
    categories: Category[];
  };
  return (
    <div>
      <MobileHeader
        title={
          categories.find((c) => c.attributes.slug === filter)?.attributes
            .name || ""
        }
      />
      <MobileCategoryList categories={categories} filter={filter} />
      <MobileBlogList data={data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
