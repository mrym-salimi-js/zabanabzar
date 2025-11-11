// Handle GET req

import { getAllFiles } from "@/lib/db/queries/files";
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
