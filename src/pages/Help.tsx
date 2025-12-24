import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Mail, HelpCircle, ChevronRight } from "lucide-react";

const helpTopics = [
  {
    icon: FileText,
    title: "How to Create an Invoice",
    steps: [
      "Navigate to the Invoices page from the sidebar",
      "Click the 'Create Invoice' button in the top right",
      "Select a customer or add a new one",
      "Add line items with product/service, quantity, and price",
      "Apply any applicable taxes (GST, VAT, etc.)",
      "Preview and send the invoice via email or download as PDF",
    ],
  },
  {
    icon: CreditCard,
    title: "How Payments Work",
    steps: [
      "Payments can be recorded manually or received online",
      "Go to Payments page to view all transactions",
      "Click 'Record Payment' to manually add a payment",
      "Link payments to specific invoices for reconciliation",
      "Partial payments are supported - track remaining balances automatically",
      "Export payment reports for accounting purposes",
    ],
  },
];

export default function Help() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground mt-1">
              Learn how to use Zenelait Billing Software
            </p>
          </div>
        </div>

        <div className="grid gap-6 opacity-0 animate-slide-up">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="metric-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {topic.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}

          {/* Contact Support */}
          <Card className="metric-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need more help? Our support team is here to assist you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email Support</p>
                  <p className="font-medium">support@zenelait.com</p>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Response Time</p>
                  <p className="font-medium">Within 24 hours</p>
                </div>
              </div>
              <Button className="mt-4 gap-2" variant="glow">
                <Mail className="h-4 w-4" />
                Send Email
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="metric-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <HelpCircle className="h-5 w-5 text-accent" />
                </div>
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium text-sm">How do I add custom taxes?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to Settings → Tax Configuration to add GST, VAT, or custom tax rates.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium text-sm">Can I customize invoice templates?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes! Navigate to Settings → Invoice Templates to customize colors, logo, and layout.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium text-sm">How do recurring invoices work?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    When creating an invoice, enable "Recurring" and set the frequency. Invoices will be auto-generated.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
