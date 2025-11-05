"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo, useState } from "react";

export function PaginatedList() {
  // CurrentPage
  const [currentPage, setCurrentPage] = useState<number>(1);
  // TotalPage
  const totalPages = 5;

  // Create Array for 3 visible pages
  const visiblePages = useMemo(() => {
    const start = Math.min(currentPage - 1, currentPage);
    const end = Math.min(totalPages, start + 2);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i === 0 ? i + 1 : i);
    return pages;
  }, [currentPage, totalPages]);

  // Handle go to page
  const handleGoToPage = () => {};

  // Handle next page

  // Handle prev page

  return (
    <div className="w-full h-auto mt-4 flex items-center justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
          </PaginationItem>

          {visiblePages.map((p) => {
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href={p === 1 ? `/files` : `/files/page${p}`}
                  isActive={currentPage === p}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
