import CustomEditor from "@/components/editor/custom-editor";
import DefaultEditor from "@/components/editor/default-editor";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor")({
  component: Editor,
});

function Editor() {
  return (
    <SidebarProvider className="h-screen flex">
      <AppSidebar />
      <div className="flex flex-1 overflow-hidden">
        <CustomEditor />
        <DefaultEditor />
      </div>
    </SidebarProvider>
  );
}
