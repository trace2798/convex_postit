"use client";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { SUPPORTED_LANGUAGES } from "@/lib/language";
import { cn } from "@/lib/utils";
import ReactCodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { Copy, CopyCheck } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { text } from "stream/consumers";
import { useCopyToClipboard } from "usehooks-ts";
import CodeTitleBar from "./code-title-bar";

interface CodeEditorProps {
  id: string;
  content: string;
  language: string;
  padding: string;
  textSize: string;
  title: string;
}
export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
  target: {
    value: string;
  };
};

const CodeEditor: FC<CodeEditorProps> = ({
  id,
  content,
  language,
  padding,
  textSize,
  title,
}) => {
  const { mutate, pending } = useApiMutation(
    api.snippet_personal.updateContent
  );
  // const [copiedText, copy] = useCopyToClipboard();
  const [originalcontent, setOriginalcontent] = useState(content);
  const [extension, setExtension] = useState<any>(null);
  const [fileExtension, setFileExtension] = useState("");
  useEffect(() => {
    setOriginalcontent(content);
  }, [content]);

  useEffect(() => {
    // Find the selected language in your SUPPORTED_LANGUAGES array
    const languageDefinition = SUPPORTED_LANGUAGES.find(
      (lang) => lang.id === language
    );

    let fileExtension = "";
    if (languageDefinition) {
      setFileExtension(languageDefinition.fileExtension);
      // Load the extension for the selected language
      languageDefinition.extension().then(setExtension);
    }
  }, [language]);

  const handleContentChange = (value: string, viewUpdate: ViewUpdate) => {
    mutate({
      id: id,
      content: value,
    })
      .then(() => {
        toast.success("Content Updated");
      })
      .catch(() => {
        toast.error("Failed to update content");
      })
  };
 // console.log("TEXT SIZE", textSize);
 // console.log("Padding SIZE", padding);
  // const handleDownload = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([content], { type: "text/plain" });
  //   element.href = URL.createObjectURL(file);
  //   element.download = `${title}.${fileExtension}`;
  //   document.body.appendChild(element); // Required for this to work in FireFox
  //   element.click();
  // };
  return (
    <>
      <div className="flex flex-col w-[250px] md:w-full">
        <CodeTitleBar
          title={title}
          content={content}
          fileExtension={fileExtension}
          snippetId={id}
        />
        
        <ReactCodeMirror
          className={cn(
            "w-auto min-w-[250px] max-w-[5xl] max-h-[100%] overflow-y-auto",
            // `${padding}`,
            `${textSize}`
          )}
          value={`${content}`}
          lang={`${language}`}
          extensions={[extension ? [extension] : [], EditorView.lineWrapping]}
          readOnly={false}
          theme={"dark"}
          placeholder="//Enter code snippet here..."
          onChange={handleContentChange}
        />
      </div>
    </>
  );
};

export default CodeEditor;