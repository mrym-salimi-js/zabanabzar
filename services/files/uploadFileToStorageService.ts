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

// import { getFileFromIndexedDB } from "@/lib/indexedDB";
// import { useUploadStore } from "@/store/uploadFileStore";
// import axios from "axios";
// import toast from "react-hot-toast";

// export const uploadFile = async (id: string) => {
//   const { updateProgress, updateStatus } = useUploadStore.getState(); // Use getState() method beacause we import zustand hook in a usual funtion not component

//   // Get saved file from indexedDB
//   const file = await getFileFromIndexedDB(id);
//   if (!file) return;

//   updateStatus(id, "uploading");

//   // Append file into formData
//   const formData = new FormData();
//   formData.append("file", file);

//   await axios
//     .post("/api/files/storage", formData, {
//       // Get percent of file progress
//       onUploadProgress: (event) => {
//         const percent = Math.round((event.loaded * 100) / (event.total ?? 1));

//         updateProgress(id, percent);
//       },
//     })
//     .then((response) => {
//       //Get file URL
//       const fileUrl = response.data.fileUrl;
//       updateStatus(id, "done", fileUrl);
//     })
//     .catch((error) => {
//       console.dir(error);
//       toast.error("فایل در server storage اپلود نشد");
//       updateStatus(id, "error");
//     });
// };
