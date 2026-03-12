"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye, Loader2, CheckCircle2, Clock } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
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
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
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
            {messages.filter((m) => !m.read).length} unread of {messages.length} messages
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markAsRead(msg._id);
                }}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${selected?._id === msg._id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                  } ${!msg.read ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <span className="font-medium text-sm truncate">{msg.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.subject}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="p-6 rounded-lg border border-border space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selected.subject}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    From <span className="font-medium text-foreground">{selected.name}</span> &lt;{selected.email}&gt;
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {selected.read ? (
                      <><CheckCircle2 className="w-3 h-3" /> Read</>
                    ) : (
                      <><Clock className="w-3 h-3" /> Unread</>
                    )}
                    <span>·</span>
                    <span>{new Date(selected.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                    title="Reply"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deleteMessage(selected._id)}
                    className="p-2 rounded-md hover:bg-red-500/10 text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <hr className="border-border" />
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{selected.message}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
