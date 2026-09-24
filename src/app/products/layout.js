import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/layout/Header";

export default function ProductsLayout({ children }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
