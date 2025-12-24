import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Palette,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Users,
  Zap,
} from "lucide-react";

const settingsSections = [
  { icon: Building2, title: "Company", description: "Business details and branding" },
  { icon: Palette, title: "Appearance", description: "Theme and display settings" },
  { icon: Bell, title: "Notifications", description: "Email and alert preferences" },
  { icon: Shield, title: "Security", description: "2FA and access controls" },
  { icon: Globe, title: "Integrations", description: "Connect third-party apps" },
  { icon: CreditCard, title: "Billing", description: "Subscription and payments" },
  { icon: Users, title: "Team", description: "Manage users and roles" },
  { icon: Zap, title: "AI Settings", description: "Configure AI features" },
];

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl">
        <div className="opacity-0 animate-fade-in mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Company Info */}
          <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-lg font-semibold mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="Zenelait Infotech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input id="email" type="email" defaultValue="billing@zenelait.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input id="gst" defaultValue="29ABCDE1234F1Z5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 98765 43210" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="glow" size="sm">Save Changes</Button>
            </div>
          </div>

          <Separator />

          {/* Quick Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
            {settingsSections.map((section, index) => (
              <div
                key={index}
                className="metric-card cursor-pointer group flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
