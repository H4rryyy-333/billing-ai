import { Zap, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    type: "prediction",
    icon: TrendingUp,
    title: "Revenue Forecast",
    description: "Expected 15% growth next month based on current pipeline",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "alert",
    icon: AlertTriangle,
    title: "Late Payment Risk",
    description: "3 invoices with high probability of delayed payment",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Pricing Optimization",
    description: "Consider adjusting rates for Enterprise tier (+8% potential)",
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

export function AIInsightsCard() {
  return (
    <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Smart recommendations</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View all
        </Button>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:border-border transition-colors cursor-pointer group"
          >
            <div className={`p-2.5 rounded-lg ${insight.bgColor}`}>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm mb-1">{insight.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
