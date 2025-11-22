ALTER TABLE "files" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."upload_type";--> statement-breakpoint
CREATE TYPE "public"."upload_type" AS ENUM('text', 'document', 'podcast', 'video');--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "type" SET DATA TYPE "public"."upload_type" USING "type"::"public"."upload_type";--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "name";