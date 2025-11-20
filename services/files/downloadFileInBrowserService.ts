import axios from "axios";

export async function downloadFileInBrowserService(url: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "blob",
  });

  const fileName = url.split("/").pop() || "download";

  const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}
