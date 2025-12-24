import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  FileText,
  Send,
  Eye,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "Acme Corporation",
    email: "billing@acme.com",
    amount: 45000,
    date: "2024-12-20",
    dueDate: "2024-12-30",
    status: "paid",
  },
  {
    id: "INV-2024-002",
    customer: "TechStart Inc.",
    email: "accounts@techstart.io",
    amount: 28500,
    date: "2024-12-18",
    dueDate: "2024-12-28",
    status: "pending",
  },
  {
    id: "INV-2024-003",
    customer: "Global Solutions Ltd.",
    email: "finance@globalsol.com",
    amount: 72000,
    date: "2024-12-15",
    dueDate: "2024-12-25",
    status: "overdue",
  },
  {
    id: "INV-2024-004",
    customer: "Innovate Labs",
    email: "pay@innovatelabs.co",
    amount: 15750,
    date: "2024-12-12",
    dueDate: "2024-12-22",
    status: "paid",
  },
  {
    id: "INV-2024-005",
    customer: "Digital Dynamics",
    email: "billing@digitald.com",
    amount: 33200,
    date: "2024-12-10",
    dueDate: "2024-12-20",
    status: "pending",
  },
  {
    id: "INV-2024-006",
    customer: "StartUp Hub",
    email: "accounts@startuphub.in",
    amount: 89000,
    date: "2024-12-08",
    dueDate: "2024-12-18",
    status: "paid",
  },
  {
    id: "INV-2024-007",
    customer: "Cloud Systems",
    email: "finance@cloudsys.net",
    amount: 54500,
    date: "2024-12-05",
    dueDate: "2024-12-15",
    status: "overdue",
  },
  {
    id: "INV-2024-008",
    customer: "Data Corp",
    email: "billing@datacorp.com",
    amount: 41200,
    date: "2024-12-03",
    dueDate: "2024-12-13",
    status: "draft",
  },
];

const statusConfig = {
  paid: { label: "Paid", class: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", class: "bg-warning/10 text-warning border-warning/20" },
  overdue: { label: "Overdue", class: "bg-destructive/10 text-destructive border-destructive/20" },
  draft: { label: "Draft", class: "bg-muted text-muted-foreground border-muted" },
};

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your invoices
            </p>
          </div>
          <div className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" variant="glow">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 opacity-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold">{invoices.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
            <p className="text-sm text-success mb-1">Paid</p>
            <p className="text-2xl font-bold text-success">
              {invoices.filter((i) => i.status === "paid").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
            <p className="text-sm text-warning mb-1">Pending</p>
            <p className="text-2xl font-bold text-warning">
              {invoices.filter((i) => i.status === "pending").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-sm text-destructive mb-1">Overdue</p>
            <p className="text-2xl font-bold text-destructive">
              {invoices.filter((i) => i.status === "overdue").length}
            </p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Invoice
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Due Date
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-sm">{invoice.customer}</p>
                        <p className="text-xs text-muted-foreground">{invoice.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold">
                        ₹{invoice.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(invoice.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={statusConfig[invoice.status as keyof typeof statusConfig].class}
                      >
                        {statusConfig[invoice.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Send className="h-4 w-4" />
                            Send
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
