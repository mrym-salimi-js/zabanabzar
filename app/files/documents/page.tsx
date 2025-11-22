import Notification from "@/components/Notification";
import { FilesList } from "./FilesList";
import Tabs from "../_components/Tabs";

export default function Documents() {
  return (
    <div className="w-full h-auto flex flex-col gap-2 rounded-sm md:border-[1px] items-end">
      {/* Tabs */}
      <Tabs />
      {/*Extraction text from file proccess */}
      <Notification />
      {/*List of files */}
      <FilesList />
    </div>
  );
}
