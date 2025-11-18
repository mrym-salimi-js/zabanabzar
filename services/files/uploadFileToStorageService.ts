import axios from "axios";

export const uploadFileToStorageService = async (
  file: File,
  onProgress?: (percent: number) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/api/files/storage", formData, {
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });

  return response.data.fileUrl;
};
