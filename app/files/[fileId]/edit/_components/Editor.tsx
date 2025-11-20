"use client";

import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { MenuBar } from "./MenuBar";

export default function Editor({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"], // اعمال فقط روی پاراگراف و تیترها
      }),
      Highlight,
    ],

    content: content,
    editorProps: {
      attributes: {
        class:
          "w-full border rounded-md p-3 bg-white dark:bg-[var(--background-dark)] dark:text-white",
      },
    },
    immediatelyRender: false,
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
