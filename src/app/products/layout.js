import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/Toast";

export default function ProductsLayout({ children }) {
  return (
    <AuthGuard>
      <ToastProvider>
        <div className="min-h-screen">
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
        </div>
      </ToastProvider>
    </AuthGuard>
  );
}
