import { DotPatternStatic } from "./dot-pattern";

const CustomEditor = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden border bg-background">
      <DotPatternStatic />

      <div>CustomEditor</div>
    </div>
  );
};

export default CustomEditor;
