// Handle GET req

import {
  craeteFile,
  deleteArryFiles,
  getAllFiles,
} from "@/lib/db/queries/files";
import { deleteFromStorage } from "@/services/files/deleteFileFromStorageService";
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
