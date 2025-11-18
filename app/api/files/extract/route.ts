// app/api/files/extract/route.ts
import { downloadFileFromStorageService } from "@/services/files/downloadFileFromStorageService";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return new Response(JSON.stringify({ error: "فایل ارسال نشده" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // File Download
    const res = await downloadFileFromStorageService(fileUrl);

    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ error: "خطای دانلود فایل", details: text }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get file buffer
    const buffer = Buffer.from(await res.arrayBuffer());

    // Get file type
    const contentType = res.headers.get("Content-Type") || "";

    // Simple file
    if (contentType.startsWith("text/")) {
      const text = buffer.toString("utf8");
      return new Response(JSON.stringify({ text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Word
    if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const text = (await mammoth.extractRawText({ buffer })).value;
      return new Response(JSON.stringify({ text }), {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      });
    }
    // PDF
    if (
      contentType === "application/pdf" ||
      fileUrl.toLowerCase().endsWith(".pdf")
    ) {
      const data = await pdfParse(buffer);

      const text = data.text || "";
      return new Response(JSON.stringify({ text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "نوع فایل پشتیبانی نمی‌شود" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("خطای استخراج فایل:", err);
    return new Response(
      JSON.stringify({ error: "خطای سرور", details: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
