"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useFilesPage } from "@/store/upadteFilesPageStore";
import { FileListResponse } from "@/types/file";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
type PaginatedListProp = {
  files: FileListResponse | undefined;
};

export function PaginatedList({ files }: PaginatedListProp) {
  // CurrentPage
  const {
    page: currentPage,
    setPage: setCurrentPage,
    setNextPage,
    setPrevPage,
  } = useFilesPage();

  const path = usePathname();

  // TotalPage
  const totalPages = files?.totalPages || 1;

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
    for (let i = start; i <= end; i++) {
      if (start === -1) {
        return [1];
      }
      if (start === 0) {
        return [1, 2];
      }
      if (start > 0) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages === 1) return;
  return (
    <div className="w-full h-auto flex py-3 items-center justify-center text-[0.9rem]">
      <Pagination>
        <PaginationContent>
          <PaginationItem className={currentPage === 1 ? "hidden" : "block"}>
            <Link
              href={
                currentPage - 1 === 1
                  ? path
                  : `${path}?page${Math.max(1, currentPage - 1)}`
              }
              onClick={() => setNextPage()}
              className="px-3 py-2 flex gap-1 items-center rounded-md hover:bg-[var(--primary-light)] dark:hover:bg-[var(--primary-light)]"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--primary)]" />
              <p className="text-[var(--primary)]">قبلی</p>
            </Link>
          </PaginationItem>

          {visiblePages.map((p) => {
            return (
              <PaginationItem key={p} onClick={() => setCurrentPage(p)}>
                <Link
                  href={p === 1 ? path : `${path}?page${p}`}
                  onClick={() => setCurrentPage(p)}
                  className={`px-4 py-2 rounded-md text-black dark:text-white ${
                    currentPage === p
                      ? "bg-[var(--primary)] text-white "
                      : "hover:bg-[var(--primary-light)] dark:hover:bg-[var(--primary-dark)]"
                  }`}
                >
                  {toPersianNumbers(p)}
                </Link>
              </PaginationItem>
            );
          })}

          <PaginationItem
            className={currentPage === totalPages ? "hidden" : "block"}
          >
            <Link
              href={`${path}?page${Math.min(totalPages, currentPage + 1)}`}
              onClick={() => setPrevPage(totalPages)}
              className="px-3 py-2  flex gap-1 items-center rounded-md hover:bg-[var(--primary-light)] dark:hover:bg-[var(--primary-dark)]"
            >
              <p className="text-[var(--primary)]">بعدی</p>
              <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
