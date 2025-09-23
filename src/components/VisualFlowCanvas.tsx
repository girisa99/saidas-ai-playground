import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, Path } from 'fabric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MousePointer, 
  Square, 
  Circle as CircleIcon, 
  Type, 
  ArrowRight, 
  Trash2,
  Download,
  Palette,
  Undo,
  Redo,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

interface VisualFlowCanvasProps {
  contentType?: 'journey' | 'workflow' | 'process' | 'timeline';
  data?: any;
  onSave?: (canvasData: string) => void;
  autoGenerate?: boolean;
}

type Tool = 'select' | 'rectangle' | 'circle' | 'text' | 'arrow' | 'line';

export const VisualFlowCanvas: React.FC<VisualFlowCanvasProps> = ({
  contentType = 'workflow',
  data,
  onSave,
  autoGenerate = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [activeColor, setActiveColor] = useState('#3b82f6');
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    setFabricCanvas(canvas);
    saveState(canvas);

    // Auto-generate template if specified
    if (autoGenerate) {
      setTimeout(() => {
        generateTemplate(canvas, contentType);
      }, 500);
    }

    return () => {
      canvas.dispose();
    };
  }, []);

  const saveState = (canvas: FabricCanvas) => {
    const state = JSON.stringify(canvas.toJSON());
    setCanvasHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(state);
      return newHistory.slice(-20); // Keep last 20 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  };

  const undo = () => {
    if (!fabricCanvas || historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    fabricCanvas.loadFromJSON(canvasHistory[newIndex], () => {
      fabricCanvas.renderAll();
    });
  };

  const redo = () => {
    if (!fabricCanvas || historyIndex >= canvasHistory.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    
    fabricCanvas.loadFromJSON(canvasHistory[newIndex], () => {
      fabricCanvas.renderAll();
    });
  };

  const generateTemplate = (canvas: FabricCanvas, type: string) => {
    canvas.clear();
    canvas.backgroundColor = '#ffffff';

    switch (type) {
      case 'journey':
        generateJourneyTemplate(canvas);
        break;
      case 'workflow':
        generateWorkflowTemplate(canvas);
        break;
      case 'process':
        generateProcessTemplate(canvas);
        break;
      case 'timeline':
        generateTimelineTemplate(canvas);
        break;
      default:
        generateWorkflowTemplate(canvas);
    }

    canvas.renderAll();
    saveState(canvas);
    toast.success(`${type} template generated!`);
  };

  const generateJourneyTemplate = (canvas: FabricCanvas) => {
    const stages = ['Awareness', 'Consideration', 'Decision', 'Action', 'Retention'];
    
    stages.forEach((stage, index) => {
      const x = 100 + index * 130;
      const y = 200;

      // Stage circle
      const circle = new Circle({
        left: x,
        top: y,
        fill: colors[index % colors.length],
        radius: 40,
        stroke: '#ffffff',
        strokeWidth: 3
      });

      // Stage text
      const text = new FabricText(stage, {
        left: x - 30,
        top: y + 60,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#1f2937',
        textAlign: 'center'
      });

      // Connecting arrow
      if (index < stages.length - 1) {
        const arrow = new Path('M 0 0 L 20 0 L 15 -5 M 20 0 L 15 5', {
          left: x + 50,
          top: y + 20,
          stroke: '#6b7280',
          strokeWidth: 2,
          fill: ''
        });
        canvas.add(arrow);
      }

      canvas.add(circle, text);
    });

    // Title
    const title = new FabricText('Customer Journey Map', {
      left: 300,
      top: 50,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#1f2937',
      fontWeight: 'bold'
    });
    canvas.add(title);
  };

  const generateWorkflowTemplate = (canvas: FabricCanvas) => {
    const steps = ['Start', 'Process', 'Decision', 'Action', 'End'];
    
    steps.forEach((step, index) => {
      const x = 150;
      const y = 100 + index * 100;

      let shape;
      if (step === 'Start' || step === 'End') {
        shape = new Circle({
          left: x,
          top: y,
          fill: step === 'Start' ? '#10b981' : '#ef4444',
          radius: 30
        });
      } else if (step === 'Decision') {
        shape = new Rect({
          left: x,
          top: y,
          fill: '#f59e0b',
          width: 80,
          height: 60,
          angle: 45
        });
      } else {
        shape = new Rect({
          left: x,
          top: y,
          fill: '#3b82f6',
          width: 120,
          height: 60,
          rx: 10
        });
      }

      const text = new FabricText(step, {
        left: x + 20,
        top: y + 20,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#ffffff',
        fontWeight: 'bold'
      });

      // Connecting line
      if (index < steps.length - 1) {
        const line = new Line([x + 60, y + 70, x + 60, y + 130], {
          stroke: '#6b7280',
          strokeWidth: 2
        });
        canvas.add(line);
      }

      canvas.add(shape, text);
    });
  };

  const generateProcessTemplate = (canvas: FabricCanvas) => {
    const processes = ['Input', 'Transform', 'Validate', 'Output'];
    
    processes.forEach((process, index) => {
      const x = 50 + index * 180;
      const y = 200;

      const rect = new Rect({
        left: x,
        top: y,
        fill: colors[index],
        width: 150,
        height: 80,
        rx: 15
      });

      const text = new FabricText(process, {
        left: x + 40,
        top: y + 30,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: '#ffffff',
        fontWeight: 'bold'
      });

      if (index < processes.length - 1) {
        const arrow = new Path('M 0 0 L 30 0 L 25 -8 M 30 0 L 25 8', {
          left: x + 160,
          top: y + 40,
          stroke: '#374151',
          strokeWidth: 3,
          fill: ''
        });
        canvas.add(arrow);
      }

      canvas.add(rect, text);
    });
  };

  const generateTimelineTemplate = (canvas: FabricCanvas) => {
    const events = ['2020', '2021', '2022', '2023', '2024'];
    
    // Main timeline line
    const timelineLine = new Line([100, 300, 700, 300], {
      stroke: '#374151',
      strokeWidth: 4
    });
    canvas.add(timelineLine);

    events.forEach((event, index) => {
      const x = 100 + index * 150;
      const y = 300;

      // Timeline point
      const point = new Circle({
        left: x - 8,
        top: y - 8,
        fill: colors[index],
        radius: 12,
        stroke: '#ffffff',
        strokeWidth: 3
      });

      // Event text
      const text = new FabricText(event, {
        left: x - 20,
        top: y - 50,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#1f2937',
        fontWeight: 'bold'
      });

      // Description box
      const descBox = new Rect({
        left: x - 40,
        top: y + 30,
        fill: '#f3f4f6',
        width: 80,
        height: 40,
        rx: 5,
        stroke: '#d1d5db'
      });

      const descText = new FabricText('Event ' + (index + 1), {
        left: x - 25,
        top: y + 40,
        fontSize: 10,
        fontFamily: 'Arial',
        fill: '#6b7280'
      });

      canvas.add(point, text, descBox, descText);
    });
  };

  const handleToolClick = (tool: Tool) => {
    if (!fabricCanvas) return;

    setActiveTool(tool);
    fabricCanvas.isDrawingMode = false;

    if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 80,
        rx: 5
      });
      fabricCanvas.add(rect);
      saveState(fabricCanvas);
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 40
      });
      fabricCanvas.add(circle);
      saveState(fabricCanvas);
    } else if (tool === 'text') {
      const text = new FabricText('Click to edit', {
        left: 100,
        top: 100,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: activeColor
      });
      fabricCanvas.add(text);
      saveState(fabricCanvas);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#ffffff';
    fabricCanvas.renderAll();
    saveState(fabricCanvas);
    toast.success('Canvas cleared!');
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });
    
    const link = document.createElement('a');
    link.download = `${contentType}-flow.png`;
    link.href = dataURL;
    link.click();
    
    onSave?.(dataURL);
    toast.success('Visual flow saved!');
  };

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: CircleIcon, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Visual Flow Canvas
          <Badge variant="secondary" className="capitalize">{contentType}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
          <div className="flex gap-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Button
                  key={tool.id}
                  variant={activeTool === tool.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleToolClick(tool.id as Tool)}
                  title={tool.label}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={undo} title="Undo">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={redo} title="Redo">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border-2 ${
                  activeColor === color ? 'border-foreground' : 'border-border'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setActiveColor(color)}
              />
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex gap-1 ml-auto">
            <Button variant="ghost" size="sm" onClick={() => generateTemplate(fabricCanvas!, contentType)}>
              Generate Template
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="border border-border rounded-lg overflow-hidden bg-white">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <p><strong>Instructions:</strong> Use the toolbar to add shapes and text. Click "Generate Template" for a starter layout. Select objects to move, resize, or delete them.</p>
        </div>
      </CardContent>
    </Card>
  );
};