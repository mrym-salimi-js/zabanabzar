export async function updateExTextInDBService(
  id: number,
  text: string | undefined
) {
  const res = await fetch("/api/files", {
    method: "PATCH",
    body: JSON.stringify({ id, text }),
    headers: { "Content-Type": "application/json" },
  });

  return res;
}
