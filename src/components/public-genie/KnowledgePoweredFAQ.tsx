import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MessageSquare, 
  Brain, 
  Lightbulb, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { genieKnowledgeBase, searchKnowledgeBase } from "@/data/genieKnowledgeBase";
import { useConversationalAI } from "./EnhancedConversationalAI";

interface KnowledgePoweredFAQProps {
  onStartConversation?: (query: string) => void;
}

export const KnowledgePoweredFAQ = ({ onStartConversation }: KnowledgePoweredFAQProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { generateSiteNavigationSuggestions } = useConversationalAI({ message: searchQuery });

  // Extract FAQ categories from knowledge base
  const faqCategories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "ai", name: "AI Capabilities", icon: Brain },
    { id: "technology", name: "Technology Stack", icon: Lightbulb },
    { id: "healthcare", name: "Healthcare Applications", icon: MessageSquare },
    { id: "journey", name: "My AI Journey", icon: ArrowRight },
    { id: "experiments", name: "Experimentation", icon: Sparkles }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchKnowledgeBase(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const getFeaturedQuestions = () => {
    return [
      {
        category: "AI Capabilities",
        question: "What can Genie AI help me with?",
        answer: genieKnowledgeBase.aiCapabilities.specializations.join(", "),
        context: "ai"
      },
      {
        category: "AI Journey", 
        question: "How does the 5-phase AI journey work?",
        answer: Object.values(genieKnowledgeBase.experimentationFramework.phases).join(" → "),
        context: "journey"
      },
      {
        category: "Technology Stack",
        question: "What AI technologies have you explored?",
        answer: genieKnowledgeBase.technologyStack.llms.join(", "),
        context: "technology"
      },
      {
        category: "Healthcare",
        question: "How does AI apply to healthcare and digital therapeutics?",
        answer: genieKnowledgeBase.healthcareExpertise.digitalTherapeutics.definition,
        context: "healthcare"
      },
      {
        category: "Security",
        question: "How do you handle AI security and compliance?",
        answer: genieKnowledgeBase.securityCompliance.considerations.slice(0, 3).join(", "),
        context: "technology"
      },
      {
        category: "Getting Started",
        question: "How do I start experimenting with AI?",
        answer: "Start small with specific problems, document everything, test safely with real data, iterate based on feedback.",
        context: "experiments"
      }
    ];
  };

  const filteredQuestions = selectedCategory === "all" 
    ? getFeaturedQuestions()
    : getFeaturedQuestions().filter(q => q.context === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
          <Brain className="w-4 h-4 mr-2" />
          Knowledge Base
        </Badge>
        <h2 className="text-2xl font-bold mb-4">
          Genie AI Knowledge Center
        </h2>
        <p className="text-muted-foreground mb-6">
          Search our comprehensive knowledge base or ask Genie AI directly
        </p>
      </div>

      {/* Search Interface */}
      <Card className="p-6 bg-gradient-to-r from-genie-primary/5 to-genie-secondary/5">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search the knowledge base or ask a question..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {searchQuery && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Ask Genie AI:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStartConversation?.(searchQuery)}
                className="border-genie-primary text-genie-primary hover:bg-genie-primary/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat about "{searchQuery.slice(0, 30)}..."
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-genie-primary" />
            Knowledge Base Results
          </h3>
          <div className="space-y-3">
            {searchResults.slice(0, 5).map((result, index) => {
              const [path, content] = result.split(': ');
              return (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium text-genie-primary mb-1">
                    {path.replace(/\./g, ' → ')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {content}
                  </div>
                </div>
              );
            })}
          </div>
          
          {searchQuery && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-2">Site Navigation Suggestions:</div>
              {generateSiteNavigationSuggestions(searchQuery).map((suggestion, index) => (
                <div key={index} className="text-sm text-genie-primary">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {faqCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 
                "bg-genie-primary text-white" : 
                "border-genie-primary/30 text-genie-primary hover:bg-genie-primary/10"
              }
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Featured Questions */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Featured Questions</h3>
        {filteredQuestions.map((faq, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge className="bg-genie-secondary/20 text-genie-secondary border-genie-secondary/30 mb-2">
                    {faq.category}
                  </Badge>
                  <h4 className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </h4>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStartConversation?.(faq.question)}
                  className="flex-shrink-0 ml-4"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStartConversation?.(faq.question)}
                  className="border-genie-primary text-genie-primary hover:bg-genie-primary/10"
                >
                  Ask Genie AI
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Knowledge Base Stats */}
      <Card className="p-6 bg-gradient-to-r from-genie-teal/10 to-genie-cyan/10 border-genie-teal/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Complete Knowledge Integration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-genie-primary">6</div>
              <div className="text-sm text-muted-foreground">Site Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-genie-teal">20+</div>
              <div className="text-sm text-muted-foreground">AI Tools Tested</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-genie-secondary">5</div>
              <div className="text-sm text-muted-foreground">Journey Phases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-genie-cyan">100%</div>
              <div className="text-sm text-muted-foreground">Knowledge Integrated</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Genie AI has access to ALL site content, experiments, case studies, and journey insights
          </p>
          <Button
            onClick={() => onStartConversation?.("Tell me about the complete AI experimentation journey")}
            className="bg-genie-primary hover:bg-genie-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Comprehensive AI Chat
          </Button>
        </div>
      </Card>
    </div>
  );
};