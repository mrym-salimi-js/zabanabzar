import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { DDBWordType } from "./DDBWordType";
import AudioRecorder from "./AudioRecorder";

export default function ModalContent() {
  const { setWord, setDescription, setTranslation, setExample } =
    useFlashCardStore();
  const handleOnChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const desc = e.target.value;
    setDescription(desc);
  };
  const handleOnChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setWord(word);
  };
  const handleOnChangeTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const translation = e.target.value;
    setTranslation(translation);
  };
  const handleOnChangeExample = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const example = e.target.value;
    setExample(example);
  };
  return (
    <div className="w-full h-[300px] text-[0.8rem] flex flex-col gap-1 items-end justify-center ">
      <div className="w-full h-auto flex gap-1 py-2 justify-end">
        {/*Audio DDB */}
        <AudioRecorder />
        {/* Word types DDB */}
        <DDBWordType />
      </div>

      <input
        className="w-full h-12 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] p-2  placeholder:text-gray-300"
        placeholder="word"
        onChange={handleOnChangeWord}
      />
      <input
        className="w-full h-12 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] p-2  placeholder:text-gray-300"
        placeholder="translation"
        onChange={handleOnChangeTranslate}
      />

      <textarea
        onChange={handleOnChangeExample}
        className="w-full h-18 p-2 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] placeholder:text-gray-300"
        placeholder="example"
      ></textarea>
      <textarea
        onChange={handleOnChangeDesc}
        className="w-full h-18 p-2 outline-0  rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] placeholder:text-gray-300"
        placeholder="description"
      ></textarea>
    </div>
  );
}
