"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken, getStoredUser, parseUser } from "@/lib/auth";
import Logo from "@/components/ui/Logo";
import { LogoutIcon } from "@/components/ui/Icons";
import { secondaryButtonClass } from "@/components/ui/styles";

const subscribe = () => () => {};

export default function Header() {
  const router = useRouter();
  const userJson = useSyncExternalStore(subscribe, getStoredUser, () => null);
  const user = useMemo(() => parseUser(userJson), [userJson]);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const initials = user ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}` : "";

  function handleLogout() {
    clearToken();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/products" className="flex items-center gap-2.5 font-semibold text-slate-900">
          <Logo />
          Product Admin
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 ring-2 ring-white">
                {initials}
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium text-slate-900">{fullName}</p>
                <p className="text-xs text-slate-500">@{user.username}</p>
              </div>
            </div>
          )}
          <span className="hidden h-6 w-px bg-slate-200 sm:block" />
          <button onClick={handleLogout} className={`${secondaryButtonClass} px-3 py-1.5`}>
            <LogoutIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
