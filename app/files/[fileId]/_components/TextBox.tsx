export default async function TextBox({ fileId }: { fileId: string }) {
  const res = await fetch(`http://localhost:3000/api/files/${fileId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return (
    <div className="w-full h-auto flex items-center justify-between">
      <div className="w-full h-[300px] ms:w-[90%] rounded-md border bg-white p-3">
        <p className="w-full break-words text-[0.8rem] whitespace-pre-wrap">
          {data?.exText}
        </p>
      </div>
    </div>
  );
}
