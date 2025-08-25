import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { Bell, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

interface NotificationsProps {
  notifications: Notification[];
  auth: {
    user: {
      role: "admin" | "influencer" | "brand";
      name: string;
    };
  };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "Notifications", href: "/notifications" }];

export default function Notifications({ notifications: initial, auth }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initial);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToastMessage = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const markAsRead = async (id: number) => {
    try {
      await axios.post(`/admin/dashboard/notifications/${id}/mark-as-read`);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      router.reload({ only: ["unreadNotificationsCount"], preserveUrl: true });
      showToastMessage("Notification marked as read!", "success");
    } catch (error) {
      console.error("Failed to mark as read", error);
      showToastMessage("Failed to mark as read.", "error");
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post(`/admin/dashboard/notifications/mark-all-as-read`);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      router.reload({ only: ["unreadNotificationsCount"], preserveUrl: true });
      showToastMessage("All notifications marked as read!", "success");
    } catch (error) {
      console.error("Failed to mark all as read", error);
      showToastMessage("Failed to mark all as read.", "error");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const safeDate = dateString.replace(" ", "T");
    const d = new Date(safeDate);
    return isNaN(d.getTime()) ? dateString : d.toLocaleString();
  };

  // Split notifications
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  // Pagination state
  const [unreadCount, setUnreadCount] = useState(4);
  const [readCount, setReadCount] = useState(4);

  const loadMoreUnread = () => setUnreadCount((prev) => prev + 4);
  const loadMoreRead = () => setReadCount((prev) => prev + 4);

  return (
    <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
      <Head title="Notifications" />

      {/* Toast */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${
            toastType === "success"
              ? "bg-black text-white dark:text-black dark:bg-white"
              : "bg-red-500"
          }`}
        >
          {toastType === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notifications
          </h1>
          {notifications.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Mark All as Read
            </Button>
          )}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unread Notifications */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Unread</h2>
            {unread.length === 0 ? (
              <p className="text-muted-foreground">No unread notifications.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {unread.slice(0, unreadCount).map((n) => (
                    <Card key={n.id} className="bg-background shadow-sm">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                          <CardTitle className="text-base font-semibold">{n.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{n.message}</p>
                        </div>
                        <Button size="sm" variant="default" className="shrink-0" onClick={() => markAsRead(n.id)}>
                          Mark as Read
                        </Button>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                        <span>{formatDate(n.created_at)}</span>
                        <span className="text-primary">Unread</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {unreadCount < unread.length && (
                  <Button className="mt-4 w-full" onClick={loadMoreUnread}>
                    Load More
                  </Button>
                )}
              </>
            )}
          </section>

          {/* Read Notifications */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Read</h2>
            {read.length === 0 ? (
              <p className="text-muted-foreground">No read notifications yet.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {read.slice(0, readCount).map((n) => (
                    <Card key={n.id} className="bg-muted/50 border border-border transition-all duration-200">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                          <CardTitle className="text-base font-semibold">{n.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{n.message}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                        <span>{formatDate(n.created_at)}</span>
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" /> Read
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {readCount < read.length && (
                  <Button className="mt-4 w-full" onClick={loadMoreRead}>
                    Load More
                  </Button>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
