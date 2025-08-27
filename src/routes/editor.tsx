import CustomEditor from "@/components/editor/custom-editor";
import DefaultEditor from "@/components/editor/default-editor";
import { AppSidebar, navElementItems } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export interface DragPreviewProps {
  visible: boolean;
  x: number;
  y: number;
  type: navElementItems | undefined;
}

export const Route = createFileRoute("/editor")({
  component: Editor,
});

function Editor() {
  const [dragPreview, setDragPreview] = useState<DragPreviewProps>({
    visible: false,
    x: 0,
    y: 0,
    type: undefined,
  });

  const handleDrag = (
    e: React.DragEvent<HTMLButtonElement>,
    title: navElementItems
  ) => {
    const { clientX, clientY } = e;
    console.log("handledrag", clientX, clientY);
    setDragPreview({
      visible: true,
      x: clientX,
      y: clientY,
      type: title,
    });
  };

  return (
    <SidebarProvider className="h-screen flex">
      <AppSidebar handleDrag={handleDrag} />
      <div className="flex flex-1 overflow-hidden">
        <CustomEditor
          dragPreview={dragPreview}
          setDragPreview={setDragPreview}
        />
        <DefaultEditor
          dragPreview={dragPreview}
          setDragPreview={setDragPreview}
        />
      </div>
    </SidebarProvider>
  );
}
