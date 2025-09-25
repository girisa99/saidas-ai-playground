import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Search, 
  Code, 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Play,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

export const QuickStart = () => {
  const steps = [
    {
      number: 1,
      title: "Curiosity & Discovery",
      subtitle: "From Abstract Theory to Practical Reality",
      description: "Inspired by real-world AI applications, I moved beyond theoretical concepts to explore AI's practical potential. Started testing different tools to understand their capabilities.",
      icon: <Lightbulb className="h-8 w-8" />,
      duration: "2-3 weeks",
      difficulty: "Beginner",
      keyActions: [
        "Explored AI tool landscape",
        "Identified practical use cases", 
        "Built initial understanding",
        "Set experimentation goals"
      ],
      color: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-green-500",
      borderColor: "border-green-500/30"
    },
    {
      number: 2,
      title: "Deep Experimentation",
      subtitle: "Testing 50+ Tools & Platforms",
      description: "Dove into the diverse AI ecosystem, experimenting with no-code tools, coding platforms, and various models. Focused on understanding capabilities and limitations through hands-on testing.",
      icon: <Search className="h-8 w-8" />,
      duration: "2 months intensive",
      difficulty: "Intermediate",
      keyActions: [
        "Tested 50+ AI tools",
        "Explored no-code/low-code platforms",
        "Evaluated LLMs and SLMs",
        "Documented successes and failures"
      ],
      color: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500",
      borderColor: "border-blue-500/30"
    },
    {
      number: 3,
      title: "Practical Implementation",
      subtitle: "Building Real Solutions",
      description: "Integrated AI components, leveraged agentic systems, and ensured high-quality data to build robust solutions. Multiple use cases were tested and validated during this phase.",
      icon: <Code className="h-8 w-8" />,
      duration: "4-6 weeks",
      difficulty: "Advanced",
      keyActions: [
        "Built AI-powered applications",
        "Integrated multiple AI components",
        "Implemented agentic systems",
        "Validated real-world use cases"
      ],
      color: "from-purple-500/20 to-indigo-500/20",
      iconBg: "bg-purple-500",
      borderColor: "border-purple-500/30"
    },
    {
      number: 4,
      title: "Transformation & Sharing",
      subtitle: "Impact & Knowledge Transfer",
      description: "Applied AI to transform processes and outcomes. Documented the journey, shared insights, and focused on fostering AI literacy. Real examples and samples coming soon!",
      icon: <Rocket className="h-8 w-8" />,
      duration: "Ongoing",
      difficulty: "Expert",
      keyActions: [
        "Transformed existing processes",
        "Documented the complete journey",
        "Shared knowledge and insights",
        "Built knowledge repository"
      ],
      color: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500",
      borderColor: "border-orange-500/30"
    }
  ];

  const stats = [
    {
      icon: <Target className="h-6 w-6" />,
      value: "20+",
      label: "AI Tools Tested",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "2",
      label: "Industries Analyzed",
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "Potential",
      label: "ROI",
      color: "text-purple-600"
    }
  ];

  const difficultyColors = {
    "Beginner": "bg-green-100 text-green-800 border-green-300",
    "Intermediate": "bg-yellow-100 text-yellow-800 border-yellow-300", 
    "Advanced": "bg-purple-100 text-purple-800 border-purple-300",
    "Expert": "bg-red-100 text-red-800 border-red-300"
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <Play className="w-4 h-4 mr-2" />
            My AI Experimentation Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From <span className="text-primary">Curiosity</span> to Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing experience and learnings through experimentation from use cases explored and successes 
            and failures with the Experimentation Hub. Real insights from hands-on AI exploration.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-to-br from-background to-primary/5 border-primary/20">
              <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/30 to-primary/10 rounded-full hidden lg:block"></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}>
                {/* Step Number Circle */}
                <div className={`absolute ${index % 2 === 0 ? 'lg:right-0 lg:translate-x-1/2' : 'lg:left-0 lg:-translate-x-1/2'} top-8 left-1/2 lg:transform lg:-translate-y-1/2 w-16 h-16 ${step.iconBg} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10`}>
                  {step.number}
                </div>
                
                <Card className={`p-8 bg-gradient-to-br ${step.color} ${step.borderColor} border-2 hover:scale-105 transition-all duration-300 group ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 p-3 ${step.iconBg}/10 rounded-xl`}>
                      <div className={`${step.iconBg.replace('bg-', 'text-')}`}>
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 bg-background/80 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{step.duration}</span>
                        </div>
                        <Badge className={difficultyColors[step.difficulty as keyof typeof difficultyColors]}>
                          {step.difficulty}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-lg font-medium text-muted-foreground mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-2 mb-6">
                        {step.keyActions.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Impact Metrics */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">3+ Months</div>
            <p className="text-muted-foreground">Focused Experimentation</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
            <p className="text-muted-foreground">Use Cases Addressed</p>
          </Card>
        </div>

      </div>
    </section>
  );
};