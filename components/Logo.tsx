import Image from "next/image";
import React, { ReactElement } from "react";

export function Logo(): ReactElement {
  return (
    <div className="flex flex-row-reverse gap-2 items-end">
      <Image alt="زبان ابزار" src="/Logo.png" width={30} height={30} priority />
      <h1 className="dark:text-white font-semibold">زبان ابزار</h1>
    </div>
  );
}
