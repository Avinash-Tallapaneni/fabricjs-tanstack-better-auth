import { SignInForm } from "@/components/auth/sign-in-form";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="bg-muted min-h-svh flex items-center justify-center p-0 md:p-4">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:max-w-6xl">
        <SignInForm />
      </div>
    </div>
  );
}
