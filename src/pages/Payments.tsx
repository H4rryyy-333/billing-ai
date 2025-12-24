import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Payments() {
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
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="metric-card flex items-center justify-center h-64 opacity-0 animate-slide-up">
          <p className="text-muted-foreground">Payment tracking coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
}
