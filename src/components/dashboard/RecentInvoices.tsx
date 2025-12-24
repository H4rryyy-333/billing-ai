import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "Acme Corporation",
    amount: "₹45,000",
    date: "Dec 20, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-002",
    customer: "TechStart Inc.",
    amount: "₹28,500",
    date: "Dec 18, 2024",
    status: "pending",
  },
  {
    id: "INV-2024-003",
    customer: "Global Solutions Ltd.",
    amount: "₹72,000",
    date: "Dec 15, 2024",
    status: "overdue",
  },
  {
    id: "INV-2024-004",
    customer: "Innovate Labs",
    amount: "₹15,750",
    date: "Dec 12, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-005",
    customer: "Digital Dynamics",
    amount: "₹33,200",
    date: "Dec 10, 2024",
    status: "pending",
  },
];

const statusStyles = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentInvoices() {
  return (
    <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Invoices</h3>
          <p className="text-sm text-muted-foreground">Latest billing activity</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/invoices" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {invoice.customer.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm">{invoice.customer}</p>
                <p className="text-xs text-muted-foreground">{invoice.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-sm">{invoice.amount}</p>
                <p className="text-xs text-muted-foreground">{invoice.date}</p>
              </div>
              <Badge
                variant="outline"
                className={statusStyles[invoice.status as keyof typeof statusStyles]}
              >
                {invoice.status}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
