// app/api/files/extract/route.ts
import { downloadFileFromStorageService } from "@/services/files/downloadFileFromStorageService";
import pdfParse from "pdf-parse";

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

    // دانلود فایل
    const res = await downloadFileFromStorageService(fileUrl);

    if (!res.ok) {
      const text = await res.text(); // متن پاسخ سرور اگر خطا بود
      return new Response(
        JSON.stringify({ error: "خطای دانلود فایل", details: text }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // گرفتن buffer فایل
    const buffer = Buffer.from(await res.arrayBuffer());

    // تشخیص نوع فایل
    const contentType = res.headers.get("Content-Type") || "";

    // فایل متن ساده
    if (contentType.startsWith("text/")) {
      const text = buffer.toString("utf8");
      return new Response(JSON.stringify({ text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // فایل PDF
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
