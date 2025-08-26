import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignUpForm() {
  const [loading, setLoading] = useState({
    email: false,
    github: false,
    google: false,
  });

  const handleSocialSignUp = async (provider: "github" | "google") => {
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
              ctx.error.message || `Failed to sign up with ${provider}`
            );
          },
        }
      );
    } catch (error) {
      toast.error(`An unexpected error occurred during ${provider} sign up`);
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, email: true }));

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    // Basic Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setLoading((prev) => ({ ...prev, email: false }));
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading((prev) => ({ ...prev, email: false }));
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading((prev) => ({ ...prev, email: false }));
      return;
    }

    try {
      await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/protectedroute/dashboard",
        },
        {
          onSuccess: () => {
            toast.success(
              "Account created successfully! Please check your email to verify your account."
            );
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to create account");
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
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => handleSocialSignUp("github")}
                  disabled={true}
                >
                  {loading.github ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                  Sign up with GitHub
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => handleSocialSignUp("google")}
                  disabled={loading.google}
                >
                  {loading.google ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Sign up with Google
                </Button>
              </div>

              <div className="relative text-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={loading.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    required
                    disabled={loading.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password (min. 6 characters)"
                    required
                    minLength={6}
                    disabled={loading.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    disabled={loading.email}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  disabled={loading.email}
                >
                  {loading.email && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading.email ? "Creating account..." : "Sign up"}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                  onClick={(e) => loading.email && e.preventDefault()}
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
