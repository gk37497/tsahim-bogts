"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { FooterLinks } from "../utils/constants";
import Image from "next/image";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

const appDownloadLink:FooterLink[] = [
  {
    id: 21,
    url: "https://drive.google.com/file/d/1wKCgqVvFssRC8D4RXJUUB6iFNrfGDj_K/view?usp=drive_link",
    newTab: true,
    text: "Апп татах",
  },
  {
    id: 20,
    url: "https://tsakhimbogts-strapi-93db2.ondigitalocean.app/admin",
    newTab: true,
    text: "Админ",
  },

]

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex justify-end">
      <Link
        href={url}
        className={`hover:dark:text-[#0245A3] text-sm my-1 ${
          path === url && "dark:text-[#0245A3] dark:border-[#0245A3]"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/news/${attributes.slug}`}
        className="hover:dark:text-[#0245A3]"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string }) {
  return (
    <Image
      src={social}
      width={150}
      height={70}
      style={{objectFit: 'contain'}}
      alt="social"
    />
  );
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  return (
    <footer className="py-6 bg-gray-50 dark:text-gray-900">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50 max-w-6xl">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>
          <div className="col-span-full text-right md:col-span-6">
            <p className="pb-1 font-medium">Хуудсууд</p>
            <ul>
              {[...menuLinks,...appDownloadLink].map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
          {FooterLinks.map((link) => {
            return (
              <a
                key={link.title}
                rel="noopener noreferrer"
                href={link.link}
                title={link.title}
                target={"_blank"}
                className="flex items-center justify-center relative"
              >
                <RenderSocialIcon social={link.logo} />
              </a>
            );
          })}
        </div>

        <div className="grid justify-center border-none pb-4 pt-8 md:pt-0">
          <div className="flex items-center justify-center w-full">
            <span className="text-sm">
              ©{new Date().getFullYear()} Бүх эрх хуулиар хамгаалагдсан.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
