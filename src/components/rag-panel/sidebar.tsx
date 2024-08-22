'use client'

import Link from "next/link";
import { ChartNetwork } from 'lucide-react';

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/rag-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/rag-panel/sidebar-toggle";
import { FileType } from "@/server/queries";

export function Sidebar({files} : {files: FileType[]}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-20 h-screen translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-black",
        sidebar?.isOpen === false ? "w-[0px] hover:w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800 ">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "-translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <ChartNetwork className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Rag Viz
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} files={files}/>
      </div>
    </aside>
  );
}