import * as fabric from "fabric";

// svg's from https://github.com/ikuaitu/vue-fabric-editor

import cornerIcon from "@/assets/corner-control-icon.svg";
import rotateIcon from "@//assets/rotate-icon.svg";
import verticalIcon from "@//assets/vertical-control-icon.svg";
import horizontalIcon from "@//assets/horizontal-control-icon.svg";

interface ControlOptions {
  x: number;
  y: number;
  cursor?: string;
  img: HTMLImageElement;
  type: "corner" | "x" | "y" | "rotate";
}

const createImage = (src: string): HTMLImageElement => {
  // If running in a server-side environment (like tanstack start or Next.js SSR, etc),
  // "window" and "Image" are not available on serverside. We return a dummy object
  // to avoid breaking the build or causing runtime errors during SSR.

  const img =
    typeof window !== "undefined" ? new Image() : ({} as HTMLImageElement);
  img.src = src;
  return img;
};

const cornerIconImage = createImage(cornerIcon);
const rotateIconImage = createImage(rotateIcon);
const edgeIconVerticalImage = createImage(verticalIcon);
const edgeIconHorizontalImage = createImage(horizontalIcon);

const createCustomControl = ({ x, y, img, type, cursor }: ControlOptions) => {
  let actionHandler: fabric.TransformActionHandler;

  switch (type) {
    case "corner":
      actionHandler = fabric.controlsUtils.scalingEqually;
      break;

    case "x":
      actionHandler = fabric.controlsUtils.scalingX;
      break;

    case "y":
      actionHandler = fabric.controlsUtils.scalingY;
      break;

    case "rotate":
      actionHandler = fabric.controlsUtils.rotationWithSnapping;
      break;

    default:
      actionHandler = fabric.controlsUtils.scalingEqually;
  }

  return new fabric.Control({
    x,
    y,
    cursorStyle: cursor,
    actionHandler,
    render: (ctx, left, top) => {
      const size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });
};

export const applyCustomControls = (obj: fabric.Object) => {
  // set back the origin back to center from top left
  obj.set({
    originX: "center",
    originY: "center",
  });

  // Update position to account for the new origin
  obj.set({
    left: obj.left + (obj.width! * obj.scaleX!) / 2,
    top: obj.top + (obj.height! * obj.scaleY!) / 2,
  });

  // corners -> uniform scaling
  obj.controls.tl = createCustomControl({
    x: -0.5,
    y: -0.5,
    cursor: "nwse-resize",
    img: cornerIconImage,
    type: "corner",
  });
  obj.controls.tr = createCustomControl({
    x: 0.5,
    y: -0.5,
    cursor: "nesw-resize",
    img: cornerIconImage,
    type: "corner",
  });
  obj.controls.bl = createCustomControl({
    x: -0.5,
    y: 0.5,
    cursor: "nesw-resize",
    img: cornerIconImage,
    type: "corner",
  });
  obj.controls.br = createCustomControl({
    x: 0.5,
    y: 0.5,
    cursor: "nwse-resize",
    img: cornerIconImage,
    type: "corner",
  });

  // top/bottom edges -> Y scaling
  obj.controls.mt = createCustomControl({
    x: 0,
    y: -0.5,
    cursor: "ns-resize",
    img: edgeIconHorizontalImage,
    type: "y",
  });
  obj.controls.mb = createCustomControl({
    x: 0,
    y: 0.5,
    cursor: "ns-resize",
    img: edgeIconHorizontalImage,
    type: "y",
  });

  // left/right edges -> X scaling
  obj.controls.ml = createCustomControl({
    x: -0.5,
    y: 0,
    cursor: "ew-resize",
    img: edgeIconVerticalImage,
    type: "x",
  });
  obj.controls.mr = createCustomControl({
    x: 0.5,
    y: 0,
    cursor: "ew-resize",
    img: edgeIconVerticalImage,
    type: "x",
  });

  obj.controls.mtr = createCustomControl({
    x: 0,
    y: -1,
    cursor: "crosshair",
    img: rotateIconImage,
    type: "rotate",
  });
};
