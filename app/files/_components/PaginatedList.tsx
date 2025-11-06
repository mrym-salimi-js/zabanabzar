"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function PaginatedList() {
  // CurrentPage
  const [currentPage, setCurrentPage] = useState<number>(1);
  // TotalPage
  const totalPages = 3;

  // Get 3 visible pages by every changing currentPage and totalPages
  const visiblePages = useMemo(() => {
    // Get start or first number of 3 visible number by min and max method
    // * =>   1 < start number < currentPage - 1
    // * < start < totalPages - 2
    const start = Math.min(totalPages - 2, Math.max(1, currentPage - 1));

    // Get end or last number of 3 visible number by min and max method
    // start + 2 < end number < totatPages
    const end = Math.min(totalPages, start + 2);

    // Get 3 visible number
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full h-auto mt-4 flex items-center justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem className={currentPage === 1 ? "hidden" : "block"}>
            <Link
              href={`/files/page${Math.max(1, currentPage - 1)}`}
              onClick={() => setCurrentPage((cp) => Math.max(1, cp - 1))}
              className="px-3 py-2 flex gap-1 items-center border rounded-md hover:bg-muted"
            >
              <p className="text-[0.8] dark:text-white">قبلی</p>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </PaginationItem>

          {visiblePages.map((p) => {
            return (
              <PaginationItem key={p} onClick={() => setCurrentPage(p)}>
                <Link
                  href={p === 1 ? `/files` : `/files/page${p}`}
                  onClick={() => setCurrentPage(p)}
                  className={`px-4 py-2 border rounded-md dark:text-white ${
                    currentPage === p
                      ? "bg-white dark:bg-transparent "
                      : "hover:bg-muted"
                  }`}
                >
                  {p}
                </Link>
              </PaginationItem>
            );
          })}

          <PaginationItem
            className={currentPage === totalPages ? "hidden" : "block"}
          >
            <Link
              href={`/files/page${Math.min(totalPages, currentPage + 1)}`}
              onClick={() =>
                setCurrentPage((cp) => Math.min(cp + 1, totalPages))
              }
              className="px-3 py-2  flex gap-1 items-center rounded-md hover:bg-muted"
            >
              <p className="text-[0.8] dark:text-white">بعدی</p>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
