"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { setToken, getToken, setUser } from "@/lib/auth";
import {
  AlertIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UserIcon,
} from "@/components/ui/Icons";
import LegendField, { legendInputClass } from "@/components/ui/LegendField";
import Logo from "@/components/ui/Logo";
import { primaryButtonClass } from "@/components/ui/styles";

const DEMO_USERNAME = "emilys";
const DEMO_PASSWORD = "emilyspass";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingRef = useRef(false);

  useEffect(() => {
    if (getToken()) router.replace("/products");
  }, [router]);

  function fillDemoAccount() {
    setUsername(DEMO_USERNAME);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submittingRef.current) return;

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      const data = await login(username.trim(), password);
      setToken(data.accessToken);
      setUser({ firstName: data.firstName, lastName: data.lastName, username: data.username });
      router.replace("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-100 via-white to-teal-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white bg-white/80 p-6 shadow-xl shadow-emerald-900/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/15 motion-safe:animate-fade-in-up sm:px-8 sm:py-7">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" className="shadow-lg ring-4 ring-white/70" />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Welcome! Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <LegendField id="username" label="Username" icon={UserIcon}>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Enter your username"
              className={legendInputClass}
            />
          </LegendField>

          <LegendField
            id="password"
            label="Password"
            icon={LockIcon}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-900/5 hover:text-slate-600"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          >
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={legendInputClass}
            />
          </LegendField>

          {error && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 motion-safe:animate-fade-in"
            >
              <AlertIcon className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className={`${primaryButtonClass} group w-full py-2.5`}>
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-300/60" />
          or
          <span className="h-px flex-1 bg-slate-300/60" />
        </div>

        <button
          type="button"
          onClick={fillDemoAccount}
          className="group mt-5 flex w-full items-center justify-between rounded-xl border border-dashed border-emerald-400/60 bg-white/50 px-4 py-2.5 text-left text-sm transition hover:border-emerald-500 hover:bg-white/80"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <UserIcon className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-medium text-slate-800">Fill in demo credentials</span>
              <span className="block font-mono text-xs text-slate-500">
                {DEMO_USERNAME} · {DEMO_PASSWORD}
              </span>
            </span>
          </span>
          <ArrowRightIcon className="h-4 w-4 text-emerald-700 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </main>
  );
}
