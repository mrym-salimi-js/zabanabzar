"use client";

import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { MenuBar } from "./MenuBar";
import { UpdateExTextBtn } from "./UpdateExTextBtn";
import { TriggerBtn } from "@/components/TriggerBtn";
import { ReDo, UnDo } from "@/components/Icons";
import { useEffect, useState } from "react";
import { useCustomEditorState } from "@/hooks/useCustomEditorState";

export default function Editor({
  content,
  fileId,
}: {
  content: string;
  fileId: number;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
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

  const [nextText, setNextText] = useState(content);

  useEffect(() => {
    if (!editor) return;

    const update = () => setNextText(editor.getHTML());

    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor]);
  const editorState = useCustomEditorState(editor);
  if (!editor) return null;
  const state = editorState as NonNullable<typeof editorState>;
  return (
    <>
      <div className="w-full flex gap-1 justify-start flex-row-reverse ">
        <div className="w-[80px]">
          <UpdateExTextBtn
            prevText={content}
            nextText={nextText}
            fileId={fileId}
          />
        </div>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!state?.canRedo}
          className="w-[80px]"
        >
          <TriggerBtn icon={ReDo} label="بعدی" />
        </button>
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!state?.canUndo}
          className="w-[80px]"
        >
          <TriggerBtn icon={UnDo} label="قبلی" />
        </button>
      </div>
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </>
  );
}
