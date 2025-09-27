import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusinessCase } from "@/data/businessUseCases";

interface BusinessCaseSelectorProps {
  businessCases: Record<string, BusinessCase>;
  selectedBusinessCase: string;
  onBusinessCaseChange: (value: string) => void;
}

export const BusinessCaseSelector = ({ 
  businessCases, 
  selectedBusinessCase, 
  onBusinessCaseChange 
}: BusinessCaseSelectorProps) => {
  return (
    <Select value={selectedBusinessCase} onValueChange={onBusinessCaseChange}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Select business case" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(businessCases).map(([key, businessCase]) => (
          <SelectItem key={key} value={key}>
            {businessCase.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};