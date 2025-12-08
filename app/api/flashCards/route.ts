import {
  createFlashCard,
  getAllFlashCards,
  updateflashCard,
} from "@/lib/db/queries/flashCards";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);
    // Call query from db/queries of files
    const data = await getAllFlashCards(page, limit);

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در دریافت فش کارت" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "شناسه فایل ارسال نشده" },
        { status: 400 }
      );
    }

    // Call query from db/queries of files
    const updated = await updateflashCard(id, data);

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در اپدیت اطلاعات فلش کارت" },
      { status: 500 }
    );
  }
}
