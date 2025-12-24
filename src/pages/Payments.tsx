import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, CreditCard, Search, Filter } from "lucide-react";
import { useState } from "react";

interface Payment {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: number;
  method: string;
  status: "paid" | "pending" | "failed";
  date: string;
}

const paymentsData: Payment[] = [
  { id: "1", invoiceNo: "INV-2024-0089", customer: "Acme Corporation", amount: 125000, method: "Bank Transfer", status: "paid", date: "2024-01-15" },
  { id: "2", invoiceNo: "INV-2024-0088", customer: "TechStart Solutions", amount: 45000, method: "UPI", status: "paid", date: "2024-01-14" },
  { id: "3", invoiceNo: "INV-2024-0087", customer: "Global Traders Ltd", amount: 89500, method: "Razorpay", status: "pending", date: "2024-01-13" },
  { id: "4", invoiceNo: "INV-2024-0086", customer: "Metro Retail", amount: 32000, method: "PayTM", status: "paid", date: "2024-01-12" },
  { id: "5", invoiceNo: "INV-2024-0085", customer: "Digital Dynamics", amount: 67800, method: "Credit Card", status: "failed", date: "2024-01-11" },
  { id: "6", invoiceNo: "INV-2024-0084", customer: "Sunrise Industries", amount: 156000, method: "Bank Transfer", status: "paid", date: "2024-01-10" },
  { id: "7", invoiceNo: "INV-2024-0083", customer: "CloudNine Tech", amount: 28500, method: "UPI", status: "pending", date: "2024-01-09" },
  { id: "8", invoiceNo: "INV-2024-0082", customer: "Fresh Foods Co", amount: 43200, method: "PayPal", status: "paid", date: "2024-01-08" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge variant="success">Paid</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ["Invoice No", "Customer", "Amount", "Method", "Status", "Date"];
    const rows = filteredPayments.map((p) => [
      p.invoiceNo,
      p.customer,
      p.amount.toString(),
      p.method,
      p.status,
      p.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "payments_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <p className="text-muted-foreground mt-1">
              Track and reconcile all payment transactions
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={exportToCSV}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.invoiceNo}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      {payment.method}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
