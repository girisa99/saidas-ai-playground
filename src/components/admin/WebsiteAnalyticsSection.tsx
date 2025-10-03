import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, MapPin, Clock, TrendingUp, Eye, Zap, BarChart3 } from 'lucide-react';

interface WebsiteAnalyticsSectionProps {
  visitorAnalytics: {
    summary: {
      total_views: number;
      unique_visitors: number;
      avg_time_on_page_seconds: number;
      unique_pages: number;
    };
    locations: Array<{
      country: string;
      region: string | null;
      visitor_count: number;
    }>;
    top_pages: Array<{
      page_path: string;
      page_title: string;
      view_count: number;
    }>;
    session_journeys: Array<{
      session_id: string;
      country: string;
      region: string | null;
      pages_visited: number;
      total_time_seconds: number;
      page_journey: Array<{
        page_path: string;
        page_title: string;
        time_on_page: number;
      }>;
    }>;
  } | null;
}

export const WebsiteAnalyticsSection: React.FC<WebsiteAnalyticsSectionProps> = ({ visitorAnalytics }) => {
  // Calculate unique countries
  const uniqueCountries = visitorAnalytics?.locations 
    ? new Set(visitorAnalytics.locations.map(l => l.country)).size 
    : 0;

  // Format average time
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Website Analytics</h2>
          <p className="text-sm text-muted-foreground">Tracking visitors across genieaiexperimentationhub.tech</p>
        </div>
      </div>

      {/* Website Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">{visitorAnalytics?.summary?.unique_visitors || 0}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{visitorAnalytics?.summary?.total_views || 0}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Time on Page</p>
                <p className="text-2xl font-bold">
                  {visitorAnalytics?.summary?.avg_time_on_page_seconds 
                    ? formatTime(visitorAnalytics.summary.avg_time_on_page_seconds)
                    : '0s'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Countries</p>
                <p className="text-2xl font-bold">{uniqueCountries}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="geographic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geographic">Geographic Distribution</TabsTrigger>
          <TabsTrigger value="pages">Page Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance by Region</TabsTrigger>
          <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
          <TabsTrigger value="retention">User Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Visitors by country, region, and city</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Visitors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitorAnalytics?.locations && visitorAnalytics.locations.length > 0 ? (
                      visitorAnalytics.locations.map((location, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              {location.country}
                            </div>
                          </TableCell>
                          <TableCell>{location.region || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{location.visitor_count}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No geographic data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Analytics</CardTitle>
              <CardDescription>Most visited pages and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Top Pages</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page Path</TableHead>
                          <TableHead>Page Title</TableHead>
                          <TableHead>Views</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visitorAnalytics?.top_pages && visitorAnalytics.top_pages.length > 0 ? (
                          visitorAnalytics.top_pages.map((page, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono text-xs">{page.page_path}</TableCell>
                              <TableCell className="max-w-md truncate">{page.page_title}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">{page.view_count}</Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                              No page data available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Geographic Location</CardTitle>
              <CardDescription>Page load times across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Session Journey Analysis</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country/Region</TableHead>
                          <TableHead>Pages Visited</TableHead>
                          <TableHead>Total Time</TableHead>
                          <TableHead>Journey Path</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visitorAnalytics?.session_journeys && visitorAnalytics.session_journeys.length > 0 ? (
                          visitorAnalytics.session_journeys.slice(0, 20).map((journey, idx) => (
                            <TableRow key={idx}>
                              <TableCell>
                                <div className="text-xs">
                                  {journey.country}
                                  {journey.region && ` / ${journey.region}`}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{journey.pages_visited}</Badge>
                              </TableCell>
                              <TableCell className="text-xs">
                                {formatTime(journey.total_time_seconds)}
                              </TableCell>
                              <TableCell className="text-xs max-w-md">
                                {journey.page_journey.map(p => p.page_path).join(' → ')}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                              No session data available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Analytics</CardTitle>
              <CardDescription>Peak hours and session duration</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Peak Hours</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 24 }, (_, i) => (
                        <Badge key={i} variant="outline" className="justify-center">
                          {i}:00 - {(i + 1) % 24}:00
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Session Duration Distribution</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Duration Range</TableHead>
                          <TableHead>Sessions</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Session data from visitor_analytics
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention">
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <CardDescription>Returning vs new visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">New Visitors</div>
                        <div className="text-2xl font-bold">-</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Returning Visitors</div>
                        <div className="text-2xl font-bold">-</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Retention Rate</div>
                        <div className="text-2xl font-bold">-</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};