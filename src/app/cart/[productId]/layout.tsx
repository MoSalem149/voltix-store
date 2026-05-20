import { ReactNode } from "react";

export const metadata = {
  title: "Shopping Cart | E-Shop",
  description: "View and manage your shopping cart",
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
