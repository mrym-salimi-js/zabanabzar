import { getFileFromIndexedDB } from "@/lib/indexedDB";
import { useUploadStore } from "@/store/uploadFileStore";
import axios from "axios";

export const uploadFile = async (id: string) => {
  const { updateProgress, updateStatus } = useUploadStore.getState(); // Use getState() metod beacause we import zustand hook in a usual funtion not component

  // Get saved file from indexedDB
  const file = await getFileFromIndexedDB(id);
  if (!file) return;

  updateStatus(id, "uploading");

  // Append file into formData
  const formData = new FormData();
  formData.append("file", file);

  await axios
    .post("/api/upload/storage", formData, {
      // Get percent of file progress
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / (event.total ?? 1));

        updateProgress(id, percent);
      },
    })
    .then((response) => {
      //Get file URL
      const fileUrl = response.data.fileUrl;

      updateStatus(id, "done", fileUrl);
    })
    .catch((error) => {
      console.dir(error);
      updateStatus(id, "error");
    });
};
