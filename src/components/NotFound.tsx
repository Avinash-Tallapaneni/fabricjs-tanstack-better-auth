"use client";

import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/15 rounded-full">
            <span className="text-4xl text-destructive font-bold">404</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {children ||
              "The page you're looking for doesn't exist or has been moved."}
          </p>
        </div>

        {/* Project Info Card */}
        <div className="bg-card border border-border rounded-xl p-6 text-left shadow-sm">
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
              <p className="text-sm mt-1">
                Authentication is required to access editor functionality and
                protected routes.
              </p>
            </div>
          </div>
        </div>

        {/* Available Pages */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Explore Available Pages
          </h3>
          <div className="flex gap-3">
            {/* <Link
              to="/sign-in"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link> */}
            <Link
              to="/"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Canvas Editor (No Login)
            </Link>
            <Link
              to="/protectedroute/$id"
              params={{
                id: "demo",
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20 font-medium px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Protected Route (Login Required)
            </Link>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="pt-4">
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground/80 text-popover hover:bg-foreground px-4 py-2 rounded-lg transition-colors duration-200 group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap pt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Start Over
          </Link>
        </div>

        {/* Tech Stack Badges */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
            <span className="text-xs text-muted-foreground">Built with</span>
            <div className="flex items-center gap-1">
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                Fabric.js
              </span>
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                Tanstack
              </span>
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                Better Auth
              </span>
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                React
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
