import { useSyncExternalStore } from "react";
import type { Session } from "next-auth";

export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function getProfileDisplayName(session: Session | null): string {
  if (!session?.user) return "";

  const userId = session.user.id ?? session.user.email ?? "default";
  try {
    const stored = localStorage.getItem(`profile-${userId}`);
    if (stored) {
      const parsed = JSON.parse(stored) as { name?: string };
      if (parsed.name) {
        return parsed.name.split(" ")[0];
      }
    }
  } catch {
    // ignore invalid stored profile
  }

  const sessionName = session.user.name ?? session.user.email ?? "";
  return sessionName.split(" ")[0] || sessionName.split("@")[0];
}

export function useProfileDisplayName(session: Session | null) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const handleUpdate = () => onStoreChange();
      window.addEventListener("storage", handleUpdate);
      window.addEventListener("profile-updated", handleUpdate);
      return () => {
        window.removeEventListener("storage", handleUpdate);
        window.removeEventListener("profile-updated", handleUpdate);
      };
    },
    () => getProfileDisplayName(session),
    () => "",
  );
}
