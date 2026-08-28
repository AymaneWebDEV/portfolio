import Link from "next/link";
import { FolderKanban, Briefcase, Mail, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your portfolio projects, experience timeline, security, and inquiries.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/projects" className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Projects</h3>
              <p className="text-xs text-muted-foreground">Add & edit portfolio work</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/experience" className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Experience</h3>
              <p className="text-xs text-muted-foreground">Manage career timeline</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/contact" className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Messages</h3>
              <p className="text-xs text-muted-foreground">View contact submissions</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/security" className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Security</h3>
              <p className="text-xs text-muted-foreground">Update 2FA password</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
