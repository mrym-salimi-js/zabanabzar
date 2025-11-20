export async function getFileByIdService(fileId: string) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/files/${fileId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.dir(error);
  }
}
