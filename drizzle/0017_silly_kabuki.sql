ALTER TABLE "flashCards" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "flashCards" ADD COLUMN "lastReviewed" timestamp;--> statement-breakpoint
ALTER TABLE "flashCards" ADD COLUMN "nextReview" timestamp;