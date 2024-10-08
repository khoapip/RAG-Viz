"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import React from "react";

import { usePathname } from "next/navigation";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const links = [
  {
    title: "Rag Viz",
    href: "/",
    value: "home",
    description: "Visual Representation of a RAG application",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
      </svg>
    ),
  },
  {
    title: "Chat",
    href: "/chat",
    value: "chat",
    description: "Simple Chat application ",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path d="M116,128a12,12,0,1,1,12,12A12,12,0,0,1,116,128ZM84,140a12,12,0,1,0-12-12A12,12,0,0,0,84,140Zm88,0a12,12,0,1,0-12-12A12,12,0,0,0,172,140Zm60-76V192a16,16,0,0,1-16,16H83l-32.6,28.16-.09.07A15.89,15.89,0,0,1,40,240a16.13,16.13,0,0,1-6.8-1.52A15.85,15.85,0,0,1,24,224V64A16,16,0,0,1,40,48H216A16,16,0,0,1,232,64ZM40,224h0ZM216,64H40V224l34.77-30A8,8,0,0,1,80,192H216Z"></path>
      </svg>
    ),
  },
  {
    title: "Simple RAG",
    href: "/simple-rag",
    value: "simple-rag",
    description: "Simple RAG application",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path d="M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z"></path>
      </svg>
    ),
  },
];

export const NavigationMenus = () => {
  const pathname = usePathname();
  const currentLink = links.find((link) => link.href === pathname) ?? links[0];
  const otherLinks = links.filter((link) => link.href !== pathname);

  return (
    <NavigationMenu.Root className="relative z-[1] flex w-full">
      <NavigationMenu.List className="m-0 flex list-none rounded-[6px] bg-transparent p-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none text-white outline-none hover:bg-red-400 focus:shadow-[0_0_0_2px] focus:shadow-red-400">
            {currentLink?.title}{" "}
            <CaretDownIcon
              className="duration-250 relative top-[1px] text-white transition-transform ease-in-out group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-auto bg-red-500 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
            <ul className="one m-0 grid w-[400px] list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
              <li className="row-span-3 grid">
                <NavigationMenu.Link asChild>
                  <div className="focus:shadow-violet7 from-purple9 to-indigo9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]">
                    {currentLink?.svg}
                    <div className="mb-[7px] mt-4 text-[18px] font-medium leading-[1.2] text-white">
                      {currentLink?.title}
                    </div>
                    <p className="text-mauve4 text-[14px] leading-[1.3]">
                      {currentLink?.description}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              {otherLinks.map((link) => {
                return (
                  <ListItem
                    key={link.value}
                    href={link.href}
                    title={link.title}
                  >
                    {link.description}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-red-500" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute left-0 top-full flex perspective-[2000px]">
        <NavigationMenu.Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-[400px] origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: string | number | undefined | React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, SelectItemProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            "focus:shadow-violet7 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-red-200 focus:shadow-[0_0_0_2px]",
            className,
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="text-mauve11 leading-[1.4]">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  ),
);

ListItem.displayName = "ListItem";

export default function StickyNav() {
  return (
    <nav className="fixed left-0 top-0 flex h-20 w-full items-center pl-10">
      <div className="flex w-full justify-between gap-3">
        <NavigationMenus />
        <SignedOut>
          <div className="-z-0 flex space-x-3 pr-5">
            <Button
              className="rounded-full bg-white text-black"
              variant="outline"
            >
              <SignInButton />
            </Button>
            <Button
              className="rounded-full hover:bg-red-500 hover:text-black"
              variant="outline"
            >
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="pr-10">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
