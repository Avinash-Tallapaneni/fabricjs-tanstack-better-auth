import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Cpu,
  GalleryVerticalEnd,
  Loader2,
  Lock,
  Palette,
  Shield,
  Zap,
  Sparkles,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState({
    email: false,
    github: false,
    google: false,
  });

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      await authClient.signIn.social(
        {
          provider,
          callbackURL: "/protectedroute/dashboard",
        },
        {
          onError: (ctx) => {
            toast.error(
              ctx.error.message || `Failed to sign in with ${provider}`
            );
          },
        }
      );
    } catch (error) {
      toast.error(`An unexpected error occurred during ${provider} sign in`);
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, email: true }));
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading((prev) => ({ ...prev, email: false }));
      return;
    }

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/protectedroute/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.navigate({
              to: "/protectedroute/$id",
              params: {
                id: "dashboard",
              },
            });
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign in");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
      {/* Left Panel - Form (Now more prominent) */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full space-y-8 relative">
          {/* Animated background elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>

          {/* Header Section with more personality */}
          <div className="space-y-4 text-center relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg">
              <GalleryVerticalEnd className="w-8 h-8 text-white" />
              <Sparkles className="w-4 h-4 text-foreground absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-1">
              Ready to create something amazing?
              <Zap className="w-4 h-4 text-secondary fill-secondary" />
            </p>
          </div>

          {/* Sign In Card with enhanced visual appeal */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-secondary/20 rounded-full"></div>

            <form
              onSubmit={handleEmailSignIn}
              className="space-y-6 relative z-10"
            >
              {/* Social Sign In with improved buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleSocialSignIn("github")}
                  disabled={true}
                  className="flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading.github ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  GitHub
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={loading.google}
                  className="flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {loading.google ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email Sign In with improved styling */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    disabled={loading.email}
                    className="bg-background transition-all focus:ring-2 focus:ring-ring focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline transition-colors"
                      onClick={(e) => loading.email && e.preventDefault()}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    disabled={loading.email}
                    className="bg-background transition-all focus:ring-2 focus:ring-ring focus:border-ring"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  disabled={loading.email}
                >
                  {loading.email && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading.email ? "Signing in..." : "Let's create! "}
                  <Sparkles className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary hover:underline font-medium transition-colors"
              >
                Join the fun!
              </Link>
            </div>
          </div>

          {/* Tech Stack Badges with animation */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded transition-all hover:bg-primary/30 cursor-default">
                  Fabric.js
                </span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded transition-all hover:bg-primary/30 cursor-default">
                  Tanstack start
                </span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded transition-all hover:bg-primary/30 cursor-default">
                  Better Auth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Project Info (Now less dominant) */}
      <div className="hidden lg:flex lg:w-[45%] bg-sidebar flex-col justify-center p-8 lg:p-12">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Secure & Creative
            </h2>
            <p className="text-muted-foreground">
              Your designs are safe with us. Sign in to continue your creative
              journey.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded-lg mt-1">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Canvas Editor</h3>
                <p className="text-muted-foreground text-sm">
                  Create and edit designs with our powerful Fabric.js based
                  editor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded-lg mt-1">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Modern Stack</h3>
                <p className="text-muted-foreground text-sm">
                  Built with the latest technologies for optimal performance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded-lg mt-1">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Protected Routes
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your work is secure with authentication-required protected
                  routes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Demo Credentials:</span>
              <span className="block mt-1 text-muted-foreground">
                Email: demo@example.com
              </span>
              <span className="block text-muted-foreground">
                Password: demo123
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
