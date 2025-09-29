import React, { ReactElement } from "react";

export default function FileInfoDesc(): ReactElement {
  return (
    <div className="w-full h-auto flex gap-1 items-center justify-end p-2  border-b-[1px] border-gray-100 ">
      <p className="text-end text-[0.8rem] text-gray-400">
        فقط فرمت های pdf، png، jpg
      </p>
      <p className="text-end text-[0.8rem] text-gray-400 ">
        10 MG حداکثر حجم فایل
      </p>
    </div>
  );
}
