import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/lib/auth-server";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(protectedRoutes)/protectedroute/$id")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getUser();

    return {
      user,
    };
  },

  loader: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/sign-in" });
    }

    return context.user;
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const user = Route.useLoaderData();
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut();
      router.navigate({ to: "/sign-in" });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background font-family-kode">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Protected Route</CardTitle>
          <CardDescription>Welcome to your protected content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Route: <span className="text-primary">{id}</span>
            </h1>
            <p className="text-muted-foreground">
              This content is protected and requires authentication
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Authenticated
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    No session found
                  </>
                )}
              </div>
            </div>

            {user && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-center">
                  User Information
                </h2>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-auto max-h-60 custom-scrollbar">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSignOut}
              disabled={signingOut}
              className="min-w-32 cursor-pointer"
            >
              {signingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                "Sign Out"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
