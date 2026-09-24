"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.replace("/login");
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/products" className="text-lg font-semibold text-gray-800">
          Product Admin
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
