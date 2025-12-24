import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

const reportCards = [
  {
    title: "Income Report",
    description: "Revenue breakdown by period and source",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Expense Report",
    description: "Track and categorize all business expenses",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Tax Summary",
    description: "GST, VAT and tax liability reports",
    icon: BarChart3,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Customer Analytics",
    description: "Buying patterns and customer insights",
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

export default function Reports() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive business insights and AI-powered analytics
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          {reportCards.map((report, index) => (
            <div
              key={index}
              className="metric-card cursor-pointer group"
            >
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
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
