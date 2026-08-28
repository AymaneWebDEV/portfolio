"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye, Loader2, CheckCircle2, Clock } from "lucide-react";

interface ContactMessage {
  id: string;
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  created_at?: string;
  createdAt?: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMsgId = (msg: ContactMessage) => msg.id || msg._id || "";

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((prev) => prev.map((m) => (getMsgId(m) === id ? { ...m, read: true } : m)));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => getMsgId(m) !== id));
        if (selected && getMsgId(selected) === id) setSelected(null);
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {messages.length} total inquiries received
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-border/40 rounded-xl bg-card/40">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => {
              const msgId = getMsgId(msg);
              const isSelected = selected && getMsgId(selected) === msgId;
              const dateStr = msg.created_at || msg.createdAt;

              return (
                <button
                  key={msgId}
                  onClick={() => {
                    setSelected(msg);
                    if (!msg.read) markAsRead(msgId);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate text-foreground">{msg.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.subject}</p>
                    </div>
                    {dateStr && (
                      <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
                        {new Date(dateStr).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selected.subject}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    From <strong className="text-foreground">{selected.name}</strong> &lt;
                    <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                      {selected.email}
                    </a>
                    &gt;
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-mono">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>
                      {selected.created_at || selected.createdAt
                        ? new Date(selected.created_at || selected.createdAt!).toLocaleString()
                        : "Recent"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="p-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    title="Reply via Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deleteMessage(getMsgId(selected))}
                    className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr className="border-border/60" />
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground bg-secondary/30 p-4 rounded-xl border border-border/40 font-sans">
                {selected.message}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground border border-border/40 rounded-2xl bg-card/20">
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Select a message from the left to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
