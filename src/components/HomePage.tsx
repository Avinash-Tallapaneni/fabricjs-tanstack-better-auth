import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function HomePage({ children }: { children?: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted">
      <div className="max-w-xl w-full space-y-8 text-center relative">
        {/* Animated background elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        {/* Header Section */}
        <div className="space-y-4 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Welcome to the FabricJS Hub
          </h1>
          <p className="text-muted-foreground">
            Your next masterpiece is a few clicks away.
          </p>
        </div>

        {/* Project Info Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg relative overflow-hidden text-left">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            About This Project
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              This is a comprehensive demo showcasing{" "}
              <span className="text-primary font-medium">
                Fabric.js custom controls
              </span>{" "}
              with a modern{" "}
              <span className="text-primary font-medium">Tanstack Router</span>{" "}
              and <span className="text-primary font-medium">Better Auth</span>{" "}
              integration.
            </p>
            <p>
              The application features a complete authentication system with
              protected routes and a powerful canvas editor.
            </p>
            <div className="bg-muted/50 p-3 rounded-lg mt-4">
              <p className="text-sm font-medium text-foreground">
                🔒 Protected Access
              </p>
              <p className="text-xs mt-1">
                Authentication is required to access the protected routes.
              </p>
            </div>
          </div>
        </div>

        {/* Available Pages */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Explore Available Pages
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/editor"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Canvas Editor (No Login)
            </Link>
            <Link
              to="/protectedroute/$id"
              params={{
                id: "demo",
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Protected Route (Login Required)
            </Link>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="pt-4 text-center">
          <a
            href="https://github.com/Avinash-Tallapaneni/fabricjs-tanstack-better-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground/80 text-popover hover:bg-foreground px-4 py-2 rounded-lg transition-colors duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
