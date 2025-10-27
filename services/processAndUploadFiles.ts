import { saveFileToIndexedDB } from "@/lib/indexedDB";
import { uploadFile } from "./uploadFile";
import { useUploadStore } from "@/store/uploadFileStore";

export const processAndUploadFiles = async (files: FileList | File[]) => {
  const { addFiles } = useUploadStore.getState();

  Array.from(files).forEach(async (file) => {
    const id = crypto.randomUUID();

    await saveFileToIndexedDB(id, file);

    addFiles({
      id,
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
      url: undefined,
    });

    await uploadFile(id);
  });
};
