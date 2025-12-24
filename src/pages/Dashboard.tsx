import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  Receipt,
  Users,
  TrendingUp,
  Plus,
  Download,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's your business overview.
            </p>
          </div>
          <div className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" variant="glow">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="₹12,45,000"
            change={12.5}
            icon={<IndianRupee className="h-5 w-5 text-primary" />}
            iconBg="bg-primary/10"
            delay={0}
          />
          <MetricCard
            title="Pending Invoices"
            value="₹2,85,000"
            change={-5.2}
            icon={<Receipt className="h-5 w-5 text-warning" />}
            iconBg="bg-warning/10"
            delay={50}
          />
          <MetricCard
            title="Total Customers"
            value="248"
            change={8.1}
            icon={<Users className="h-5 w-5 text-success" />}
            iconBg="bg-success/10"
            delay={100}
          />
          <MetricCard
            title="Growth Rate"
            value="+18.2%"
            change={3.4}
            changeLabel="vs last quarter"
            icon={<TrendingUp className="h-5 w-5 text-info" />}
            iconBg="bg-info/10"
            delay={150}
          />
        </div>

        {/* Charts and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <AIInsightsCard />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentInvoices />
          <TopCustomers />
        </div>
      </div>
    </AppLayout>
  );
}
