import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, CreditCard, AlertTriangle, Check } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  type: "invoice" | "payment" | "overdue";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "invoice",
    title: "Invoice Created",
    description: "Invoice #INV-2024-0089 has been created for Acme Corporation",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "₹45,000 received from TechStart Solutions for Invoice #INV-2024-0085",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "overdue",
    title: "Payment Overdue",
    description: "Invoice #INV-2024-0078 for Global Traders is 5 days overdue",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "invoice",
    title: "Invoice Created",
    description: "Invoice #INV-2024-0088 has been created for Metro Retail",
    time: "Yesterday",
    read: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Received",
    description: "₹28,500 received from Digital Dynamics for Invoice #INV-2024-0082",
    time: "Yesterday",
    read: true,
  },
  {
    id: "6",
    type: "overdue",
    title: "Payment Overdue",
    description: "Invoice #INV-2024-0071 for Sunrise Industries is 10 days overdue",
    time: "2 days ago",
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "invoice":
      return FileText;
    case "payment":
      return CreditCard;
    case "overdue":
      return AlertTriangle;
    default:
      return Bell;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "invoice":
      return "text-primary bg-primary/10";
    case "payment":
      return "text-success bg-success/10";
    case "overdue":
      return "text-warning bg-warning/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="default">{unreadCount} new</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Stay updated with your billing activities
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
              <Check className="h-4 w-4" />
              Mark All Read
            </Button>
          )}
        </div>

        <div className="space-y-3 opacity-0 animate-slide-up">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const iconClass = getIconColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`metric-card flex items-start gap-4 transition-all ${
                  !notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <div className={`p-3 rounded-xl ${iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
