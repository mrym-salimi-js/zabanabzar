// Handle GET req

import {
  craeteFile,
  deleteArryFiles,
  getAllFiles,
  updateFile,
} from "@/lib/db/queries/files";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call query from db/queries of files
    const allFile = await getAllFiles();

    return NextResponse.json(allFile, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت فایل" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Call query from db/queries of files
    const newFile = await craeteFile(body);

    return NextResponse.json(newFile, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ذخیره فایل" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const urls: string[] = await req.json();

    // Call query from db/queries of files
    const deleted = await deleteArryFiles(urls);

    return NextResponse.json(deleted, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در حذف فایل" }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const { id, text } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "شناسه فایل ارسال نشده" },
        { status: 400 }
      );
    }
    if (!text) {
      return NextResponse.json(
        { error: "متن فایل ارسال نشده" },
        { status: 400 }
      );
    }
    // Call query from db/queries of files
    const updated = await updateFile(id, text);

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در اپدیت اطلاعات فایل" },
      { status: 500 }
    );
  }
}
