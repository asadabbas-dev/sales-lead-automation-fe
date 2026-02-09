import { DashboardHeader } from "@/components/dashboard/dashboard.header.component";

export default function RunsLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
