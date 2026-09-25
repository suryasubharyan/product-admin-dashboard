"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import Loader from "@/components/ui/Loader";

// No subscription needed: we only read localStorage once per render.
const subscribe = () => () => {};

export default function AuthGuard({ children }) {
  const router = useRouter();

  // Server snapshot is false/null, so server and client HTML match during hydration.
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const token = useSyncExternalStore(subscribe, getToken, () => null);

  useEffect(() => {
    if (isClient && !token) router.replace("/login");
  }, [isClient, token, router]);

  if (!token) return <Loader text="Checking login..." />;

  return children;
}
