"use client";
import Editor from "@/components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ToolBar from "./_components/toolbar";
import { useSession } from "next-auth/react";

interface SnippetIdPageProps {
  params: {
    snippetId: string;
  };
}
const SnippetIdPage = ({ params }: SnippetIdPageProps) => {
  const snippet = useQuery(api.snippets.getById, {
    snippetId: params.snippetId as Id<"snippets">,
  });

  console.log(snippet);
  const { data } = useSession();
  return (
    <>
      <div className="pb-5">
        {data?.user.id === snippet?.userId && <ToolBar snippet={snippet} />}
        <Editor snippet={snippet} />
        {/* <ResizablePanelGroup
          direction="vertical"
          className="min-h-[200px] mt-5 rounded-lg border"
        >
          {data?.user.id === snippet?.userId && (
            <>
              <ResizablePanel defaultSize={15}>
                <ToolBar snippet={snippet} />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          <ResizablePanel defaultSize={85}>
            <Editor snippet={snippet} />
          </ResizablePanel>
        </ResizablePanelGroup> */}
      </div>
    </>
  );
};

export default SnippetIdPage;
