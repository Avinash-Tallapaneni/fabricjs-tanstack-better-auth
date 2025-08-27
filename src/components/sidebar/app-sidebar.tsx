import {
  Circle,
  Command,
  ImageIcon,
  MousePointerClick,
  Square,
  Type,
  Video,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  handleDrag: (
    e: React.DragEvent<HTMLButtonElement>,
    title: navElementItems
  ) => void;
}

const navMainData = [
  {
    title: "Text",
    icon: Type,
  },
  {
    title: "Image",
    icon: ImageIcon,
  },
  {
    title: "Rectangle",
    icon: Square,
  },
  {
    title: "Circle",
    icon: Circle,
  },
  {
    title: "Button",
    icon: MousePointerClick,
  },
  {
    title: "Video",
    icon: Video,
  },
] as const;

export type navElementItems = (typeof navMainData)[number]["title"];

export function AppSidebar({ handleDrag, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="none"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="bg-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navMainData.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: (
                        <div className="flex flex-col">
                          <span className="font-extrabold text-foreground ">
                            {item.title}
                          </span>
                          <span className="text-xs text-foreground">
                            Drag and drop into the canvas
                          </span>
                        </div>
                      ),
                      hidden: false,
                      className: "text-white shadow-lg px-3 py-2 rounded",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    onDragStart={(e) => {
                      handleDrag(e, item.title as navElementItems);

                      //removing default drag element
                      const newImage = new Image();
                      newImage.src =
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
                      e.dataTransfer.setDragImage(newImage, 0, 0);
                    }}
                    draggable={true}
                    className="px-2.5 md:px-2 bg-sidebar border-sidebar-border border-2 text-chart-1 hover:bg-border cursor-pointer  justify-center"
                  >
                    <item.icon className="text-destructive" />
                    {/* <span>{item.title}</span> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
