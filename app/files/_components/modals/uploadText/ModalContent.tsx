export default function ModalContent() {
  const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    localStorage.setItem("uploaded-text", JSON.stringify(text));
  };
  return (
    <div className="w-full h-[300px] flex items-center justify-center ">
      <textarea
        onChange={handleOnChangeText}
        className="w-full h-full p-2 text-[0.8rem] rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)]"
      ></textarea>
    </div>
  );
}
