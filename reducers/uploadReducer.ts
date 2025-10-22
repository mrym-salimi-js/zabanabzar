
type FileState = {
  file: File;              // Main file
  progress: number;        // Upload percent
  status: "uploading" | "done" | "error"; // File status
  url?: string;            // Returned url of file after storage
};


type UploadState = FileState[];


type Action =
  | { type: "ADD_FILES"; files: File[] }                       
  | { type: "UPDATE_PROGRESS"; index: number; progress: number }
  | { type: "SET_STATUS"; index: number; status: "done" | "error"; url?: string }; 

export  function uploadReducer(state: UploadState, action: Action): UploadState {
  switch (action.type) {
    case "ADD_FILES":
      //Add new file into state
      return [
        ...state,
        ...action.files.map(file => ({
          file,
          progress: 0,
          status: "uploading" as 'uploading',
        })),
      ];

    case "UPDATE_PROGRESS":
      // Update progress of each file
      return state.map((item, i) =>
        i === action.index ? { ...item, progress: action.progress } : item
      );

    case "SET_STATUS":
      // Set changing status for each file
      return state.map((item, i) =>
        i === action.index
          ? { ...item, status: action.status, url: action.url }
          : item
      );

    default:
      return state;
  }
}
