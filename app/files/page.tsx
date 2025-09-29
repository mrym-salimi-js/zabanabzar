import { Bin, FileWithName, Pencil, Tick } from "@/components/icon";
import { Modal } from "@/components/files/modals/uploadFiles/Modal";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full h-[87%] flex flex-col gap-2 p-2">
        <div className="w-full h-20 flex  items-center p-2">
          <div className="flex gap-2 items-center">
            <Modal />
            <span className="w-auto h-auto py-3 px-4 flex gap-2 hover:opacity-[0.7] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--secondary)]">
              <Pencil size="size-4" color="#ffffff" />
              <p className="text-white text-[0.8rem]">تایپ</p>
            </span>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-2 bg-whit   rounded-[15px] border-[1px] p-2">
          <div className="w-full h-auto p-1 flex"></div>
          {/* Table */}
          <div dir="rtl" className="w-full h-auto p-1 flex flex-col gap-1">
            {/* Table header */}
            <div
              className="w-full h-12 p-3 text-[0.8rem] bg-gray-100  dark:bg-[var(--tertiary-dark)] dark:text-white
              grid grid-cols-[40px_repeat(5,1fr)]
              items-center text-end
              rounded-tr-[12px] rounded-tl-[12px]"
            >
              {/*Checkbox */}
              <div className="flex justify-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border !border-gray-200 dark:!border-gray-600 checked:bg-[var(--secondary)] checked:border-[var(--secondary)]"
                    id="check1"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Tick />
                  </span>
                </label>
              </div>

              {/*Others */}
              <div className="text-start truncate">نام فایل</div>
              <div className="text-start truncate">اندازه</div>
              <div className="text-start truncate">متن</div>
              <div className="text-start truncate">تاریخ آپلود</div>
              <div className="text-start truncate">سایر</div>
            </div>

            {/* Table rows */}
            <div
              className="w-full h-12 p-3 text-[0.8rem] border-b   
            grid grid-cols-[40px_repeat(5,1fr)]
            items-center text-end"
            >
              {/*Checkbox */}
              <div className="flex  gap-1 justify-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-300 dark:!border-gray-600 checked:bg-[var(--secondary)] checked:border-[var(--secondary)]"
                    id="check1"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Tick />
                  </span>
                </label>
              </div>
              {/*Others */}
              <div className="flex truncate gap-1 items-center justify-start min-w-0 text-[var(--tertiary)] ">
                <FileWithName size="w-8 h-8" color="orange" name="PNG" />
                متن تستی
              </div>

              <div className="text-start truncate text-[var(--tertiary)] min-w-0">
                2 MG
              </div>
              <div className="text-start truncate  min-w-0 text-[var(--secondary)]">
                مشاهده
              </div>
              <div className="text-start truncate text-[var(--tertiary)] min-w-0">
                1400/2/1
              </div>
              <div className="text-start truncate  min-w-0 cursor-pointer hover:opacity-[0.7]">
                <Bin size="size-5" color="var(--primary)" />
              </div>
            </div>
            <div
              className="w-full h-12 p-3 text-[0.8rem] border-b   
            grid grid-cols-[40px_repeat(5,1fr)]
            items-center text-end"
            >
              {/*Checkbox */}
              <div className="flex  gap-1 justify-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-300 dark:!border-gray-600 checked:bg-[var(--secondary)] checked:border-[var(--secondary)]"
                    id="check1"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Tick />
                  </span>
                </label>
              </div>
              {/*Others */}
              <div className="flex truncate gap-1 items-center justify-start min-w-0  text-[var(--tertiary)]">
                <FileWithName size="w-8 h-8" color="red" name="PDF" />
                متن تستی
              </div>

              <div className="text-start truncate text-[var(--tertiary)] min-w-0">
                5 MG
              </div>
              <div className="text-start truncate  min-w-0 text-[var(--primary)]">
                استخراج
              </div>
              <div className="text-start truncate text-[var(--tertiary)] min-w-0">
                1400/2/3
              </div>
              <div className="text-start truncate min-w-0 cursor-pointer hover:opacity-[0.7]">
                <Bin size="size-5" color="var(--primary)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
