import { createFlashCard } from "@/lib/db/queries/flashCards";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.dir(body);

    // Call query from db/queries of files
    const newFile = await createFlashCard(body);

    return NextResponse.json(newFile, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در ذخیره فلش کارت" },
      { status: 500 }
    );
  }
}
