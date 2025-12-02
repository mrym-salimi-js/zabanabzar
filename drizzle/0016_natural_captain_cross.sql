CREATE TYPE "public"."word_type" AS ENUM('text', 'document', 'podcast', 'video', 'image');--> statement-breakpoint
CREATE TABLE "flashCards" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "word_type" NOT NULL,
	"name" varchar(255),
	"audioUrl" text,
	"description" text,
	"example" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"repeatEvery" varchar(255)
);
