import React, { ReactElement } from "react";

type ModalContentProps = {
  icon: React.ElementType;
  question: string;
  lightBGColor: string;
  mainColor: string;
};

export default function ModalContent({
  icon: Icon,
  question,
  lightBGColor,
  mainColor,
}: ModalContentProps): ReactElement {
  return (
    <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
      <span className={`w-auto h-auto p-4 ${lightBGColor} rounded-full`}>
        <Icon classes={`size-7 ${mainColor}`} />
      </span>
      <p className="text-[0.9rem]">{question}</p>
    </div>
  );
}
