import { craeteFile } from "@/lib/db/queries/files";
import { NextResponse } from "next/server";

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
