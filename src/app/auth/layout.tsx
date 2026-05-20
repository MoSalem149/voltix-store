import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Voltix Store",
  description: "Sign in or create an account to access your Voltix Store profile",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
