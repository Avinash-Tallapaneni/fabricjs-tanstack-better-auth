import { DragPreviewProps } from "@/routes/editor";
import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";
import { DotPatternStaticBackground } from "./dot-pattern";
import { navElementItems } from "../sidebar/app-sidebar";
import { PREVIEW_SIZES } from "@/constants";
import { getCSSVariable } from "@/hooks/getCSSVariable";

const SCALING_X = 0.85;
const SCALING_Y = 0.95;

const CustomEditor = ({
  dragPreview,
  setDragPreview,
}: {
  dragPreview: DragPreviewProps;
  setDragPreview: React.Dispatch<React.SetStateAction<DragPreviewProps>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleResize = () => {
    if (!containerRef.current) return;

    const { clientHeight, clientWidth } = containerRef.current;

    fabricCanvasRef.current?.setDimensions({
      width: clientWidth * SCALING_X,
      height: clientHeight * SCALING_Y,
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    if (dragPreview.visible) {
      setDragPreview((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragPreview({
      visible: false,
      x: 0,
      y: 0,
      type: undefined,
    });

    if (dragPreview.type) {
      createElement(dragPreview.type, e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (dragPreview.visible) {
      setDragPreview((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const createElement = (type: navElementItems, e: React.DragEvent) => {
    if (!fabricCanvasRef.current) return;

    const rect = fabricCanvasRef.current.getElement().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // https://fabricjs.com/docs/configuring-controls/#configuring-control-defaults-for-every-object

    let obj: fabric.Object | undefined;

    switch (type) {
      case "Text":
        obj = new fabric.Textbox("Click to edit", {
          left: x,
          top: y,
          fontSize: 20,
          fill: getCSSVariable("--foreground"),
          editable: true,
          width: PREVIEW_SIZES["Text"].width,
        });
        break;

      case "Rectangle":
        obj = new fabric.Rect({
          left: x,
          top: y,
          fill: getCSSVariable("--primary"),
          width: PREVIEW_SIZES["Rectangle"].width,
          height: PREVIEW_SIZES["Rectangle"].height,
        });
        break;

      case "Circle":
        obj = new fabric.Circle({
          left: x,
          top: y,
          fill: getCSSVariable("--accent"),
          width: PREVIEW_SIZES["Circle"].width,
          height: PREVIEW_SIZES["Circle"].height,
          radius: PREVIEW_SIZES["Circle"].height / 2,
        });
        break;

      case "Button":
        obj = new fabric.Rect({
          left: x,
          top: y,
          fill: getCSSVariable("--destructive"),
          width: PREVIEW_SIZES["Button"].width,
          height: PREVIEW_SIZES["Button"].height,
          rx: 6,
          ry: 6,
        });
        break;

      case "Video":
        obj = new fabric.Textbox("Video Placeholder", {
          left: x,
          top: y,
          fontSize: 18,
          fill: getCSSVariable("--foreground"),
          backgroundColor: getCSSVariable("--muted"),
          textAlign: "center",
          width: PREVIEW_SIZES["Video"].width,
          height: PREVIEW_SIZES["Video"].height,
        });
        break;

      default:
        return;
    }

    if (obj) {
      fabricCanvasRef.current.add(obj);
      fabricCanvasRef.current.setActiveObject(obj);
      fabricCanvasRef.current.renderAll();
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !isMounted) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: containerRef.current.clientWidth * SCALING_X,
      height: containerRef.current.clientHeight * SCALING_Y,
      backgroundColor: getCSSVariable("--background"),
    });

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden border bg-background">
      <DotPatternStaticBackground />

      <div className="pointer-events-none select-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-foreground">
        CustomEditor
      </div>

      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDrag={handleDrag}
      >
        {isMounted && (
          <canvas
            ref={canvasRef}
            className="block h-full w-full border-primary rounded-2xl border-2"
          />
        )}

        {dragPreview.visible && dragPreview.type && (
          <div
            className="pointer-events-none fixed border-2 border-dashed z-50"
            style={{
              left: dragPreview.x,
              top: dragPreview.y,
              width: PREVIEW_SIZES[dragPreview.type].width,
              height: PREVIEW_SIZES[dragPreview.type].height,
              borderColor: getCSSVariable("--primary"),
              backgroundColor: `${getCSSVariable("--primary")}20`,
            }}
          >
            <div
              className="flex items-center justify-center h-full font-medium"
              style={{ color: getCSSVariable("--primary") }}
            >
              {dragPreview.type}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomEditor;
