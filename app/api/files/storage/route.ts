import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "هیچ فایلی ارسال نشده" }, { status: 400 });
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
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
      uploadedFiles.push(fileUrl);
    }

    return NextResponse.json({
      message: "🎉 همه فایل‌ها با موفقیت آپلود شدند",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("❌ خطا در آپلود:", error);
    return NextResponse.json({ error: "آپلود ناموفق", details: error }, { status: 500 });
  }
}
