ALTER TABLE "flashCards" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."word_type";--> statement-breakpoint
CREATE TYPE "public"."word_type" AS ENUM('Noun', 'Pronoun', 'Verb', 'Adjective', 'Adverb', 'Unknown');--> statement-breakpoint
ALTER TABLE "flashCards" ALTER COLUMN "type" SET DATA TYPE "public"."word_type" USING "type"::"public"."word_type";