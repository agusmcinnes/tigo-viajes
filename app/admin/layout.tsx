import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin - Tigo Viajes",
  description: "Panel de administracion de Tigo Viajes",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto p-6 lg:p-8 pt-20 lg:pt-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
