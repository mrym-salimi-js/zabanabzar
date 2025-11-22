CREATE TYPE "public"."upload_type" AS ENUM('file', 'text');--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "size" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "ext" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "type" "upload_type" DEFAULT 'file' NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "text_content" text;