import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Voltix Store",
  description: "Manage your Voltix Store account and profile information",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
