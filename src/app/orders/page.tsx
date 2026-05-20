import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrderHistoryClient from "@/components/OrderHistoryClient";

async function getOrders(_userId: string) {
  // In a real app, fetch from your database
  // Returning empty array until a real orders API is wired up
  return [];
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const orders = await getOrders(session.user.id ?? session.user.email ?? "");

  return <OrderHistoryClient orders={orders} />;
}
