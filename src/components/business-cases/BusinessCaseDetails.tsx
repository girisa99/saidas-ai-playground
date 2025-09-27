import { BusinessCase } from "@/data/businessUseCases";

interface BusinessCaseDetailsProps {
  currentCase: BusinessCase;
}

export const BusinessCaseDetails = ({ currentCase }: BusinessCaseDetailsProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">{currentCase.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground">{currentCase.description}</p>
      </div>
    </div>
  );
};