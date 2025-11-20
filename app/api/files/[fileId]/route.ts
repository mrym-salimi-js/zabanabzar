import { NextResponse } from "next/server";
import { getFileById } from "@/lib/db/queries/files";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params; // ← unwrap promise
    const numericId = Number(fileId);

    if (!numericId) {
      return NextResponse.json(
        { error: "شناسه فایل نامعتبر یا ارسال نشده" },
        { status: 400 }
      );
    }

    const file = await getFileById(numericId);

    if (!file) {
      return NextResponse.json({ error: "فایل یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(file, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت فایل" }, { status: 500 });
  }
}
