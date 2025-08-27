import { SignUpForm } from "@/components/auth/sign-up-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="bg-muted min-h-svh flex items-center justify-center p-0 md:p-4">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:max-w-6xl">
        <SignUpForm />
      </div>
    </div>
  );
}
