import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Products() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Products & Services</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog and inventory
            </p>
          </div>
          <Button size="sm" className="gap-2" variant="glow">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="metric-card flex items-center justify-center h-64 opacity-0 animate-slide-up">
          <p className="text-muted-foreground">Product management coming soon...</p>
        </div>
      </div>
    </AppLayout>
  );
}
