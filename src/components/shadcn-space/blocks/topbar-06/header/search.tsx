"use client";

import { useState } from "react";
import "simplebar-react/dist/simplebar.min.css";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchType {
    href: string;
    title: string;
}

const SearchLinks: SearchType[] = [
    {
        title: 'Modern',
        href: '#',
    },
    {
        title: 'eCommerce',
        href: '#',
    },
    {
        title: 'General',
        href: '#',
    },
    {
        title: 'Music',
        href: '#',
    },
    {
        title: 'General',
        href: '#',
    },
];

const Search = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
           <DialogTrigger asChild>
  <button
    type="button"
    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent sm:w-auto sm:min-w-48 sm:justify-start sm:gap-2 sm:rounded-md sm:border sm:border-border sm:px-4 sm:py-1.5 sm:hover:bg-transparent"
  >
    <SearchIcon size={16} className="shrink-0 text-muted-foreground" />
    <span className="hidden text-sm font-normal text-muted-foreground sm:block">
      Type to search...
    </span>
  </button>
</DialogTrigger>
            <DialogContent className="w-full max-w-2xl p-0 gap-0 [&>button]:hidden">
                <DialogTitle className="sr-only">Search</DialogTitle>
                <div className="p-6 border-b border-ld">
                    <Input
                        placeholder="Search links..."
                        className="flex-1 pl-4 rounded-md focus-visible:ring-0 focus-visible:shadow-none"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Search;
