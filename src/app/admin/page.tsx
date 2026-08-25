import Link from "next/link";
import { FolderKanban, Briefcase, Mail } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your portfolio projects, experience timeline, and messages.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/admin/projects" className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Projects</h3>
              <p className="text-xs text-muted-foreground">Manage portfolio showcase</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/experience" className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Experience & Education</h3>
              <p className="text-xs text-muted-foreground">Manage career timeline</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/contact" className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Messages</h3>
              <p className="text-xs text-muted-foreground">View contact submissions</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
