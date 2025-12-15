import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin - Tigo Viajes",
  description: "Panel de administración de Tigo Viajes",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
