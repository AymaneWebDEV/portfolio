export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
          <div className="text-2xl font-bold mt-2">5</div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Updates</h3>
          <div className="text-2xl font-bold mt-2">12</div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Views (Last 30d)</h3>
          <div className="text-2xl font-bold mt-2">1,234</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="text-muted-foreground text-sm">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
}
