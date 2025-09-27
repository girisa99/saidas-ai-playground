import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description?: string;
}

export const MetricCard = ({ icon: Icon, title, value, description }: MetricCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-genie-primary/5 to-genie-accent/5 border-genie-primary/20 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 text-center">
        <Icon className="w-8 h-8 mx-auto mb-2 text-genie-primary" />
        <h4 className="font-semibold text-genie-dark mb-1">{title}</h4>
        <p className="text-2xl font-bold text-genie-primary mb-1">{value}</p>
        {description && (
          <p className="text-sm text-genie-muted">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};