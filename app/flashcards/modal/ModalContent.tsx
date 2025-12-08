import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { DDBWordType } from "./DDBWordType";
import { DDBWordReview } from "./DDBWordReview";
import AudioRecorder from "./AudioRecorder";
import { FlashCardItem } from "@/types/flashcard";
import { useEffect } from "react";

export default function ModalContent({
  flashCard,
}: {
  flashCard?: FlashCardItem;
}) {
  const {
    currentWord,
    setWord,
    setDescription,
    setTranslation,
    setExample,
    setWordRepeat,
    setWordAudioUrl,
    setWordType,
  } = useFlashCardStore();

  // Handle get word detail for adding to flashCard store
  useEffect(() => {
    if (!flashCard) return;
    console.log(currentWord);
    if (!flashCard) return;
    setWord(flashCard.word);
    setDescription(flashCard.description);
    setTranslation(flashCard.translation);
    setExample(flashCard.example);
    if (flashCard.audioUrl) setWordAudioUrl(flashCard.audioUrl);
    setWordRepeat(flashCard.repeatEvery);
    setWordType(flashCard.type);
  }, []);

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
    <div className="w-full h-[300px] overflow-hidden text-[0.8rem] flex flex-col gap-1 items-end justify-center ">
      <div className="w-full h-auto flex flex-row-reverse gap-1 py-2 overflow-x-scroll">
        {/* Word types DDB */}
        <DDBWordType />
        {/* Word review */}
        <DDBWordReview />
        {/*Audio DDB */}
        <AudioRecorder />
      </div>

      <input
        className="w-full h-12 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] p-2  placeholder:text-gray-300"
        placeholder="word"
        onChange={handleOnChangeWord}
        value={currentWord?.word}
      />
      <input
        className="w-full h-12 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] p-2  placeholder:text-gray-300"
        placeholder="translation"
        onChange={handleOnChangeTranslate}
        value={currentWord?.translation}
      />

      <textarea
        onChange={handleOnChangeExample}
        className="w-full h-18 p-2 outline-0 rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] placeholder:text-gray-300"
        placeholder="example"
        value={currentWord?.example}
      ></textarea>
      <textarea
        onChange={handleOnChangeDesc}
        className="w-full h-18 p-2 outline-0  rounded-md border-[1px] !border-[var(--tertiary-light)] 
            !dark:border-[var(--tertiary-dark)] placeholder:text-gray-300"
        placeholder="description"
        value={currentWord?.description}
      ></textarea>
    </div>
  );
}
