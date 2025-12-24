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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Estimate {
  id: string;
  estimateNo: string;
  customer: string;
  amount: number;
  status: "draft" | "sent" | "accepted" | "declined";
  date: string;
}

const initialEstimates: Estimate[] = [
  { id: "1", estimateNo: "EST-2024-0015", customer: "Acme Corporation", amount: 185000, status: "sent", date: "2024-01-15" },
  { id: "2", estimateNo: "EST-2024-0014", customer: "TechStart Solutions", amount: 67500, status: "accepted", date: "2024-01-14" },
  { id: "3", estimateNo: "EST-2024-0013", customer: "Global Traders Ltd", amount: 124000, status: "draft", date: "2024-01-13" },
  { id: "4", estimateNo: "EST-2024-0012", customer: "Metro Retail", amount: 45000, status: "declined", date: "2024-01-12" },
  { id: "5", estimateNo: "EST-2024-0011", customer: "Digital Dynamics", amount: 89000, status: "sent", date: "2024-01-11" },
  { id: "6", estimateNo: "EST-2024-0010", customer: "Sunrise Industries", amount: 210000, status: "accepted", date: "2024-01-10" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "sent":
      return <Badge variant="info">Sent</Badge>;
    case "accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "declined":
      return <Badge variant="destructive">Declined</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const customers = [
  "Acme Corporation",
  "TechStart Solutions",
  "Global Traders Ltd",
  "Metro Retail",
  "Digital Dynamics",
  "Sunrise Industries",
];

export default function Estimates() {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<Estimate[]>(initialEstimates);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEstimate, setNewEstimate] = useState({
    customer: "",
    amount: "",
  });

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estimate.estimateNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || estimate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEstimate = () => {
    if (!newEstimate.customer || !newEstimate.amount) return;

    const estimate: Estimate = {
      id: Date.now().toString(),
      estimateNo: `EST-2024-${String(estimates.length + 16).padStart(4, "0")}`,
      customer: newEstimate.customer,
      amount: parseFloat(newEstimate.amount),
      status: "draft",
      date: new Date().toISOString().split("T")[0],
    };

    setEstimates([estimate, ...estimates]);
    setNewEstimate({ customer: "", amount: "" });
    setDialogOpen(false);
    toast.success("Estimate created successfully");
  };

  const handleConvertToInvoice = (estimate: Estimate) => {
    toast.success(`Estimate ${estimate.estimateNo} converted to invoice`);
    navigate("/invoices");
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage quotes for your clients
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" variant="glow">
                <Plus className="h-4 w-4" />
                Create Estimate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Estimate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={newEstimate.customer}
                    onValueChange={(value) => setNewEstimate({ ...newEstimate, customer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer} value={customer}>
                          {customer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Estimated Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newEstimate.amount}
                    onChange={(e) => setNewEstimate({ ...newEstimate, amount: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreateEstimate} className="w-full" variant="glow">
                  Create Estimate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search estimates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <FileText className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-medium">{estimate.estimateNo}</TableCell>
                  <TableCell>{estimate.customer}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{estimate.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(estimate.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{estimate.date}</TableCell>
                  <TableCell className="text-right">
                    {estimate.status === "accepted" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-primary hover:text-primary"
                        onClick={() => handleConvertToInvoice(estimate)}
                      >
                        Convert to Invoice
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
