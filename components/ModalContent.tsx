import React, { ReactElement } from "react";

type ModalContentProps = {
  icon: React.ElementType;
  question: string;
  lightBGColor: string;
  mainColor: string;
  darkBGcolor: string;
};

export default function ModalContent({
  icon: Icon,
  question,
  lightBGColor,
  mainColor,
  darkBGcolor,
}: ModalContentProps): ReactElement {
  return (
    <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
      <span
        className={`w-auto h-auto p-4 ${lightBGColor} dark:${darkBGcolor} rounded-full`}
      >
        <Icon classes={`size-7 ${mainColor}`} />
      </span>
      <p className="text-[0.9rem] dark:text-white">{question}</p>
    </div>
  );
}
