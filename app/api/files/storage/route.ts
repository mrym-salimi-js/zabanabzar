import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

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

    const uploadParams = {
      Body: buffer,
      Bucket: process.env.LIARA_BUCKET_NAME as string,
      Key: file.name,
      ContentType: file.type,
    };

    await client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${file.name}`;

    return NextResponse.json({
      message: "فایل با موفقیت آپلود شد",
      fileUrl,
    });
  } catch (error) {
    console.error("❌ خطا در آپلود:", error);
    return NextResponse.json(
      { error: "آپلود ناموفق", details: error },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { fileUrl } = await request.json();
    const key = fileUrl.split("/").pop(); // Extract file name from fileUrl

    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: key,
      })
    );

    return NextResponse.json({ message: "فایل حذف شد" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حذف ناموفق" }, { status: 500 });
  }
}
