import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { getStrapiURL } from "./utils/api-helpers";
import { FALLBACK_SEO } from "./utils/constants";
import { fetchAPI } from "./utils/fetch-api";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
    appleWebApp: {
      title: "Tsahim Bogts",
      statusBarStyle: "black-translucent",
    },
    // viewport: {
    //   width: "device-width",
    //   initialScale: 1,
    //   maximumScale: 1,
    //   minimumScale: 1,
    // },
  };
}

const primaryFont = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={primaryFont.className}>
      <body>{children}</body>
    </html>
  );
}
