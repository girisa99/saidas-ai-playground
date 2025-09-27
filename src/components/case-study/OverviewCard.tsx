import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ArrowDown, ArrowUp } from "lucide-react";

interface OverviewCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  items?: string[];
  itemType?: "current" | "target";
  iconColor?: string;
}

export const OverviewCard = ({ 
  icon: Icon, 
  title, 
  content, 
  items, 
  itemType,
  iconColor = "text-blue-500" 
}: OverviewCardProps) => {
  const getItemIcon = () => {
    return itemType === "current" ? ArrowDown : ArrowUp;
  };

  const getItemColor = () => {
    return itemType === "current" ? "text-red-600" : "text-green-600";
  };

  const ItemIcon = getItemIcon();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
        {items && items.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              {itemType === "current" ? "Current Issues:" : "Target Outcomes:"}
            </h4>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className={`text-sm ${getItemColor()} flex items-start gap-2`}>
                  <ItemIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};