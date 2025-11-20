import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY as string,
    secretAccessKey: process.env.LIARA_SECRET_KEY as string,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "هیچ فایلی ارسال نشده" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uniqueKey = `${uuidv4()}_${file.name}`;

    const uploadParams = {
      Body: buffer,
      Bucket: process.env.LIARA_BUCKET_NAME as string,
      Key: uniqueKey,
      ContentType: file.type,
    };

    await client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${uniqueKey}`;

    return NextResponse.json({
      message: "فایل با موفقیت آپلود شد",
      fileUrl,
    });
  } catch (error) {
    console.error("خطا در آپلود:", error);
    return NextResponse.json(
      { error: "آپلود ناموفق", details: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "کلید فایل ارسال نشده" },
        { status: 400 }
      );
    }
    const decodedKey = decodeURIComponent(key);

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: decodedKey,
    };

    const data = await client.send(new GetObjectCommand(params));

    if (!data.Body) {
      return NextResponse.json(
        { error: "Body فایل خالی است" },
        { status: 404 }
      );
    }

    const uint8 = await data.Body.transformToByteArray(); // تبدیل به Uint8Array
    const buffer = Buffer.from(uint8); // مناسب برای Response Node.js
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": data.ContentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${decodedKey}"`,
        "X-File-Size": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "خطای دانلود", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { fileUrls } = await request.json();

    if (!fileUrls || !Array.isArray(fileUrls) || fileUrls.length === 0) {
      return NextResponse.json(
        { error: "هیچ فایلی برای حذف ارسال نشده" },
        { status: 400 }
      );
    }

    // Delete array of files
    const deletePromises = fileUrls.map((fileUrl: string) => {
      const key = fileUrl.split("/").pop(); // نام فایل
      return client.send(
        new DeleteObjectCommand({
          Bucket: process.env.LIARA_BUCKET_NAME,
          Key: key,
        })
      );
    });

    await Promise.all(deletePromises);

    return NextResponse.json({ message: "فایل‌ها با موفقیت حذف شدند" });
  } catch (error) {
    console.error("خطا در حذف:", error);
    return NextResponse.json(
      { error: "حذف ناموفق", details: error },
      { status: 500 }
    );
  }
}
