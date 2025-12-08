ALTER TABLE "flashCards" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "repeatEvery" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "lastReviewed" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "nextReview" DROP NOT NULL;