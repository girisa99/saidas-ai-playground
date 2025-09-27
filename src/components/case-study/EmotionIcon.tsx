import { LucideIcon } from "lucide-react";

interface EmotionIconProps {
  emotion: "critical" | "positive" | "neutral";
  EmotionIcon: LucideIcon;
}

export const EmotionIconDisplay = ({ emotion, EmotionIcon }: EmotionIconProps) => {
  const getEmotionStyle = (emotion: string) => {
    switch (emotion) {
      case 'critical':
        return 'text-red-500 bg-red-50';
      case 'positive':
        return 'text-green-500 bg-green-50';
      case 'neutral':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className={`p-2 rounded-full ${getEmotionStyle(emotion)}`}>
      <EmotionIcon className="w-5 h-5" />
    </div>
  );
};