import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export const additionalLinks = [
  {
    id: 1,
    text: "Бэлчээрийн менежмент",
    url: "/management",
    newTab: false,
  },
  {
    id: 2,
    text: "Сүргийн бүтэц",
    url: "/structure",
    newTab: false,
  },
  {
    id: 3,
    text: "Мал маллагаа",
    url: "/farming",
    newTab: false,
  },
  {
    id: 4,
    text: "Малын эрүүл мэнд",
    url: "/health",
    newTab: false,
  },
  {
    id: 5,
    text: "Каталоги",
    url: "/gallery",
    newTab: false,
  },
];

export default function NavbarDropDownMenu() {
  const pathname = usePathname();

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Мал аж ахуй
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-black"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-30 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {additionalLinks.map((item, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <a
                        href={item.url}
                        className={`${
                          pathname === item.url
                            ? "bg-blue-500 text-white"
                            : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <span>{item.text}</span>
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
