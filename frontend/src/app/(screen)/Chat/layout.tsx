export default async function DashboardLayout({
  children,
  sidebar,
  window
}: {
  children: React.ReactNode,
  sidebar: React.ReactNode,
  window: React.ReactNode
}) {
  
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        {sidebar}
      </aside>
      <main className="flex-1 p-4">
        {window || children}
      </main>
    </div>
  );
}