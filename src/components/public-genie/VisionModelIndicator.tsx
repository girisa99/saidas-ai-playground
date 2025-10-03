import React from 'react';
import { Eye, Image, Stethoscope, FileImage, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VisionModelIndicatorProps {
  isVisionEnabled: boolean;
  isMedicalMode: boolean;
  modelName?: string;
  className?: string;
}

export const VisionModelIndicator: React.FC<VisionModelIndicatorProps> = ({
  isVisionEnabled,
  isMedicalMode,
  modelName,
  className = ''
}) => {
  if (!isVisionEnabled) return null;

  return (
    <TooltipProvider>
      <Card className={`p-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 ${className}`}>
        <div className="flex items-center gap-3">
          {/* Vision Icon */}
          <div className="p-2 rounded-lg bg-primary/10">
            {isMedicalMode ? (
              <Stethoscope className="h-4 w-4 text-primary" />
            ) : (
              <Eye className="h-4 w-4 text-primary" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                {isMedicalMode ? 'Medical Imaging Enabled' : 'Vision Analysis Active'}
              </p>
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            </div>
            
            <p className="text-xs text-muted-foreground">
              {isMedicalMode 
                ? 'Upload medical images for educational analysis'
                : 'Upload images for AI-powered analysis'
              }
            </p>

            {modelName && (
              <Badge variant="secondary" className="text-[10px] mt-1">
                {modelName}
              </Badge>
            )}
          </div>

          {/* Capability Indicators */}
          <div className="flex flex-col gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-1.5 rounded-md bg-background/50 hover:bg-background transition-colors cursor-help">
                  <Image className="h-3.5 w-3.5 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Image Understanding</p>
              </TooltipContent>
            </Tooltip>

            {isMedicalMode && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-1.5 rounded-md bg-background/50 hover:bg-background transition-colors cursor-help">
                    <FileImage className="h-3.5 w-3.5 text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">DICOM Support</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Supported Formats */}
        {isMedicalMode && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Supported Formats:</p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-[9px] px-1.5 py-0">DICOM (.dcm)</Badge>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0">JPEG</Badge>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0">PNG</Badge>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0">TIFF</Badge>
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};
