ALTER TABLE "flashCards" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "repeatEvery" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "lastReviewed" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "nextReview" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ADD COLUMN "translation" varchar(255);