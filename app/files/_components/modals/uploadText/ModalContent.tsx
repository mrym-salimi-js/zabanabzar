import { useUploadTextStore } from "@/store/uploadTextStore";

export default function ModalContent() {
  const { addTextContent, addTextTitle } = useUploadTextStore();
  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    addTextContent(text);
  };
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    addTextTitle(title);
  };
  return (
    <div className="w-full h-[300px] text-[0.8rem] flex flex-col gap-1 items-center justify-center ">
      <input
        className="w-full h-12 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] p-2  placeholder:text-gray-300"
        placeholder="title"
        onChange={handleOnChangeTitle}
      />
      <textarea
        onChange={handleOnChangeContent}
        className="w-full h-full p-2  rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] placeholder:text-gray-300"
        placeholder="text"
      ></textarea>
    </div>
  );
}
