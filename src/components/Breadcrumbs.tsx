import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const breadcrumbNameMap: Record<string, string> = {
    '': 'Home',
    'journey': 'AI Journey',
    'about': 'About Me',
    'technology': 'Technology Stack',
    'case-studies': 'Case Studies',
    'faq': 'FAQ',
    'docs': 'Documentation',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Use',
    'disclaimer': 'Disclaimer',
    'cookies': 'Cookie Policy'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
        </li>
        
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumbName = breadcrumbNameMap[pathname] || pathname;

          return (
            <li key={pathname} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
              {isLast ? (
                <span className="text-foreground font-medium">{breadcrumbName}</span>
              ) : (
                <Link 
                  to={routeTo}
                  className="hover:text-primary transition-colors"
                >
                  {breadcrumbName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};