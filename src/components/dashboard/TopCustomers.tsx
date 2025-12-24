import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const customers = [
  {
    name: "Acme Corporation",
    revenue: "₹4,50,000",
    invoices: 24,
    avatar: "AC",
    color: "from-primary to-primary/60",
  },
  {
    name: "TechStart Inc.",
    revenue: "₹3,28,500",
    invoices: 18,
    avatar: "TI",
    color: "from-success to-success/60",
  },
  {
    name: "Global Solutions",
    revenue: "₹2,72,000",
    invoices: 15,
    avatar: "GS",
    color: "from-warning to-warning/60",
  },
  {
    name: "Innovate Labs",
    revenue: "₹2,15,750",
    invoices: 12,
    avatar: "IL",
    color: "from-info to-info/60",
  },
];

export function TopCustomers() {
  return (
    <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "350ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Top Customers</h3>
          <p className="text-sm text-muted-foreground">By revenue this year</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/customers" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div
              className={`h-10 w-10 rounded-lg bg-gradient-to-br ${customer.color} flex items-center justify-center text-sm font-semibold text-foreground`}
            >
              {customer.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{customer.name}</p>
              <p className="text-xs text-muted-foreground">{customer.invoices} invoices</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{customer.revenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
