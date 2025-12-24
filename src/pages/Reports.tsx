import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, TrendingUp, DollarSign, BarChart3, Users, Calendar, X } from "lucide-react";
import { useState } from "react";

interface ReportData {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
}

const incomeData: ReportData[] = [
  { id: "1", description: "Invoice #INV-2024-0089", amount: 125000, date: "2024-01-15", category: "Services" },
  { id: "2", description: "Invoice #INV-2024-0088", amount: 45000, date: "2024-01-14", category: "Products" },
  { id: "3", description: "Invoice #INV-2024-0087", amount: 89500, date: "2024-01-13", category: "Services" },
  { id: "4", description: "Invoice #INV-2024-0086", amount: 32000, date: "2024-01-12", category: "Products" },
  { id: "5", description: "Invoice #INV-2024-0085", amount: 67800, date: "2024-01-11", category: "Services" },
];

const expenseData: ReportData[] = [
  { id: "1", description: "Office Rent", amount: 45000, date: "2024-01-01", category: "Operations" },
  { id: "2", description: "Software Subscriptions", amount: 12500, date: "2024-01-05", category: "IT" },
  { id: "3", description: "Marketing Campaign", amount: 28000, date: "2024-01-10", category: "Marketing" },
  { id: "4", description: "Employee Salaries", amount: 180000, date: "2024-01-15", category: "Payroll" },
  { id: "5", description: "Utilities", amount: 8500, date: "2024-01-12", category: "Operations" },
];

const taxData: ReportData[] = [
  { id: "1", description: "GST Collected (18%)", amount: 64530, date: "2024-01-15", category: "GST" },
  { id: "2", description: "GST Paid (Input)", amount: 23400, date: "2024-01-15", category: "GST" },
  { id: "3", description: "TDS Deducted", amount: 15000, date: "2024-01-10", category: "TDS" },
  { id: "4", description: "Net GST Payable", amount: 41130, date: "2024-01-31", category: "GST" },
];

const customerData: ReportData[] = [
  { id: "1", description: "Acme Corporation", amount: 485000, date: "15 Invoices", category: "Enterprise" },
  { id: "2", description: "TechStart Solutions", amount: 234000, date: "8 Invoices", category: "SMB" },
  { id: "3", description: "Global Traders Ltd", amount: 189500, date: "12 Invoices", category: "Enterprise" },
  { id: "4", description: "Metro Retail", amount: 156000, date: "6 Invoices", category: "Retail" },
  { id: "5", description: "Digital Dynamics", amount: 98000, date: "4 Invoices", category: "Startup" },
];

const reportCards = [
  {
    title: "Income Report",
    description: "Revenue breakdown by period and source",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
    data: incomeData,
    columns: ["Description", "Category", "Amount", "Date"],
  },
  {
    title: "Expense Report",
    description: "Track and categorize all business expenses",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
    data: expenseData,
    columns: ["Description", "Category", "Amount", "Date"],
  },
  {
    title: "Tax Summary",
    description: "GST, VAT and tax liability reports",
    icon: BarChart3,
    color: "text-primary",
    bgColor: "bg-primary/10",
    data: taxData,
    columns: ["Description", "Type", "Amount", "Date"],
  },
  {
    title: "Customer Analytics",
    description: "Buying patterns and customer insights",
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
    data: customerData,
    columns: ["Customer", "Segment", "Total Revenue", "Invoices"],
  },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<(typeof reportCards)[0] | null>(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");

  const exportToCSV = (report: (typeof reportCards)[0]) => {
    const headers = report.columns;
    const rows = report.data.map((item) => [
      item.description,
      item.category || "",
      item.amount.toString(),
      item.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${report.title.toLowerCase().replace(" ", "_")}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive business insights and analytics
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              reportCards.forEach((report) => exportToCSV(report));
            }}
          >
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          {reportCards.map((report, index) => (
            <Card
              key={index}
              className="metric-card cursor-pointer group hover:border-primary/30 transition-all"
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${report.bgColor}`}>
                    <report.icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Detail Dialog */}
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            {selectedReport && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedReport.bgColor}`}>
                      <selectedReport.icon className={`h-5 w-5 ${selectedReport.color}`} />
                    </div>
                    {selectedReport.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Date Filters */}
                <div className="flex flex-wrap gap-4 mt-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="startDate" className="text-sm">From:</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-auto"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="endDate" className="text-sm">To:</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-auto"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 ml-auto"
                    onClick={() => exportToCSV(selectedReport)}
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>

                {/* Data Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      {selectedReport.columns.map((col) => (
                        <TableHead key={col} className={col.includes("Amount") || col.includes("Revenue") ? "text-right" : ""}>
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedReport.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Summary */}
                <div className="mt-4 p-4 rounded-lg bg-muted/30 flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold">
                    ₹{selectedReport.data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
