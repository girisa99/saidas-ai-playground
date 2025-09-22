import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search data - in a real app, this would come from an API or search index
  const searchData: SearchResult[] = [
    {
      title: "AI Implementation Journey",
      description: "Learn about my 21-year journey from healthcare skeptic to AI believer",
      url: "/journey",
      category: "Journey"
    },
    {
      title: "Healthcare AI Case Studies",
      description: "Real-world examples of successful AI implementations in healthcare",
      url: "/case-studies",
      category: "Case Studies"
    },
    {
      title: "AI Technology Stack",
      description: "Comprehensive overview of AI tools and technologies",
      url: "/technology",
      category: "Technology"
    },
    {
      title: "About Saidas",
      description: "Background and expertise in AI and healthcare technology",
      url: "/about",
      category: "About"
    }
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim() === "") {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
    setIsOpen(filteredResults.length > 0);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search AI insights, tools, case studies..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 w-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <a
              key={index}
              href={result.url}
              className="block p-3 rounded-md hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{result.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">
                  {result.category}
                </span>
              </div>
            </a>
          ))}
        </Card>
      )}
    </div>
  );
};