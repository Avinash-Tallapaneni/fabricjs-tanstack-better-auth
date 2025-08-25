import { DotPatternStatic } from "./dot-pattern";

const DefaultEditor = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden border bg-background">
      <DotPatternStatic />

      <div>DefaultEditor</div>
    </div>
  );
};

export default DefaultEditor;
