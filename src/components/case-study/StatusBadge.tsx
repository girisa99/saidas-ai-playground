import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "live" | "mixed" | "development";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'mixed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'development':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge className={`${getStatusStyle(status)} border font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};