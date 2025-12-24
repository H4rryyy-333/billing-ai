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
  Mail,
  Phone,
  Building2,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: "CUS-001",
    name: "Acme Corporation",
    email: "billing@acme.com",
    phone: "+91 98765 43210",
    totalRevenue: 450000,
    invoices: 24,
    status: "active",
    segment: "Enterprise",
    avatar: "AC",
    color: "from-primary to-primary/60",
  },
  {
    id: "CUS-002",
    name: "TechStart Inc.",
    email: "accounts@techstart.io",
    phone: "+91 87654 32109",
    totalRevenue: 328500,
    invoices: 18,
    status: "active",
    segment: "Startup",
    avatar: "TI",
    color: "from-success to-success/60",
  },
  {
    id: "CUS-003",
    name: "Global Solutions Ltd.",
    email: "finance@globalsol.com",
    phone: "+91 76543 21098",
    totalRevenue: 272000,
    invoices: 15,
    status: "inactive",
    segment: "SME",
    avatar: "GS",
    color: "from-warning to-warning/60",
  },
  {
    id: "CUS-004",
    name: "Innovate Labs",
    email: "pay@innovatelabs.co",
    phone: "+91 65432 10987",
    totalRevenue: 215750,
    invoices: 12,
    status: "active",
    segment: "Startup",
    avatar: "IL",
    color: "from-info to-info/60",
  },
  {
    id: "CUS-005",
    name: "Digital Dynamics",
    email: "billing@digitald.com",
    phone: "+91 54321 09876",
    totalRevenue: 198200,
    invoices: 10,
    status: "active",
    segment: "SME",
    avatar: "DD",
    color: "from-chart-5 to-chart-5/60",
  },
  {
    id: "CUS-006",
    name: "Cloud Systems",
    email: "finance@cloudsys.net",
    phone: "+91 43210 98765",
    totalRevenue: 154500,
    invoices: 8,
    status: "active",
    segment: "Enterprise",
    avatar: "CS",
    color: "from-destructive to-destructive/60",
  },
];

const segmentColors = {
  Enterprise: "bg-primary/10 text-primary border-primary/20",
  Startup: "bg-success/10 text-success border-success/20",
  SME: "bg-warning/10 text-warning border-warning/20",
};

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground mt-1">
              Manage your customer database
            </p>
          </div>
          <div className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" variant="glow">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
            <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
            <p className="text-sm text-success mb-1">Active</p>
            <p className="text-2xl font-bold text-success">
              {customers.filter((c) => c.status === "active").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-primary mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-primary">
              ₹{(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / 100000).toFixed(1)}L
            </p>
          </div>
          <div className="p-4 rounded-xl bg-info/5 border border-info/20">
            <p className="text-sm text-info mb-1">Avg. Revenue</p>
            <p className="text-2xl font-bold text-info">
              ₹{Math.round(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / customers.length / 1000)}K
            </p>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-slide-up" style={{ animationDelay: "250ms" }}>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="metric-card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${customer.color} flex items-center justify-center text-sm font-bold text-foreground`}
                  >
                    {customer.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-xs text-muted-foreground">{customer.id}</p>
                  </div>
                </div>
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
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  <p className="font-semibold">₹{customer.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Invoices</p>
                  <p className="font-semibold">{customer.invoices}</p>
                </div>
                <Badge
                  variant="outline"
                  className={segmentColors[customer.segment as keyof typeof segmentColors]}
                >
                  {customer.segment}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
