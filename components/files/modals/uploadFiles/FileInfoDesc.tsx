import React, { ReactElement } from "react";

export default function FileInfoDesc(): ReactElement {
  return (
    <div className="w-full h-auto flex flex-col gap-1 items-start  p-2  border-b-[1px] border-gray-100 ">
      <p className="text-end text-[0.8rem] text-gray-400">
        فرمت های مجاز: .txt,.pdf,.docx,.jpg,.jpeg,.png
      </p>

      <p className="text-end text-[0.8rem] text-gray-400 ">
        10 MG حداکثر حجم هر فایل
      </p>
    </div>
  );
}
