import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Eye, 
  Users, 
  Globe, 
  Clock, 
  TrendingUp,
  Calendar,
  RefreshCw,
  MapPin,
  Navigation
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsSummary {
  summary: {
    total_views: number;
    unique_sessions: number;
    unique_visitors: number;
    unique_pages: number;
    avg_time_on_page_seconds: number;
    views_last_24h: number;
    sessions_last_24h: number;
  };
  top_pages: Array<{
    page_path: string;
    page_title: string;
    view_count: number;
  }>;
  locations: Array<{
    country: string;
    region: string;
    visitor_count: number;
  }>;
  session_journeys: Array<{
    session_id: string;
    first_visit: string;
    last_visit: string;
    total_time_seconds: number;
    pages_visited: number;
    country?: string;
    region?: string;
    page_journey: Array<{
      page_path: string;
      page_title: string;
      visit_time: string;
      time_on_page: number;
    }>;
  }>;
  daily_trend: Array<{
    date: string;
    views: number;
    unique_sessions: number;
  }>;
  hourly_distribution: Record<string, number>;
  period_days: number;
}

export const VisitorAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30); // days
  const { toast } = useToast();

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_visitor_analytics_summary', {
        days_back: timeRange
      });

      if (error) throw error;
      setAnalytics(data as unknown as AnalyticsSummary);
    } catch (error) {
      console.error('Error loading visitor analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load visitor analytics.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No analytics data available
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visitor Analytics</h2>
          <p className="text-muted-foreground">Website traffic and engagement metrics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 7 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(7)}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === 30 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(30)}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === 90 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(90)}
          >
            90 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadAnalytics}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.total_views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.summary.views_last_24h} in last 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.unique_visitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.summary.sessions_last_24h} sessions in 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time on Page</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(analytics.summary.avg_time_on_page_seconds)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per page view
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Visited</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.unique_pages}</div>
            <p className="text-xs text-muted-foreground">
              Unique pages viewed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most viewed pages in the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.top_pages?.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{page.page_path}</TableCell>
                    <TableCell>{page.page_title || '-'}</TableCell>
                    <TableCell className="text-right font-medium">
                      {page.view_count.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Daily Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Traffic Trend</CardTitle>
          <CardDescription>Page views and sessions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Sessions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.daily_trend?.slice(0, 14).map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{day.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{day.unique_sessions.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Locations</CardTitle>
          <CardDescription>Geographic distribution of visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Visitors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.locations?.length > 0 ? (
                  analytics.locations.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {location.country || 'Unknown'}
                        </div>
                      </TableCell>
                      <TableCell>{location.region || '-'}</TableCell>
                      <TableCell className="text-right">
                        {location.visitor_count.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No location data available yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Session Journeys */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Session Journeys</CardTitle>
          <CardDescription>Detailed visitor paths and time spent per page</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-6">
              {analytics.session_journeys?.map((session, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm text-muted-foreground">
                          {session.session_id.substring(0, 20)}...
                        </span>
                      </div>
                      {session.country && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {session.country}{session.region && `, ${session.region}`}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {session.pages_visited} pages
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDuration(session.total_time_seconds)} total
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {session.page_journey.map((page, pageIndex) => (
                      <div key={pageIndex} className="flex items-center gap-3 text-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {pageIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{page.page_title || page.page_path}</div>
                          <div className="text-xs text-muted-foreground font-mono truncate">
                            {page.page_path}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">{formatDuration(page.time_on_page)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <span>{new Date(session.first_visit).toLocaleString()}</span>
                    <span>→</span>
                    <span>{new Date(session.last_visit).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Visitor Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Locations</CardTitle>
          <CardDescription>Geographic distribution of visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Visitors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.locations?.length > 0 ? (
                  analytics.locations.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{location.country}</TableCell>
                      <TableCell>{location.region || '-'}</TableCell>
                      <TableCell className="text-right">{location.visitor_count}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      Location data not available yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Session Journeys */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Session Journeys</CardTitle>
          <CardDescription>Detailed visitor paths and time spent per page</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {analytics.session_journeys?.map((session, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {session.pages_visited} pages
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(session.total_time_seconds)} total
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.first_visit).toLocaleString()}
                        {session.country && ` • ${session.country}`}
                        {session.region && `, ${session.region}`}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {session.page_journey?.map((page, pageIndex) => (
                      <div key={pageIndex} className="flex items-start gap-2 text-sm">
                        <Badge variant="secondary" className="mt-0.5">
                          {pageIndex + 1}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs truncate">{page.page_path}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {page.page_title || 'Untitled'}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDuration(page.time_on_page)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic by Hour</CardTitle>
          <CardDescription>Page views distribution throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            {Object.entries(analytics.hourly_distribution || {}).map(([hour, count]) => {
              const maxCount = Math.max(...Object.values(analytics.hourly_distribution || {}));
              const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={hour} className="flex flex-col items-center gap-2">
                  <div className="w-full bg-secondary rounded-t" style={{ height: `${Math.max(height, 10)}px` }}>
                    <div 
                      className="w-full bg-primary rounded-t transition-all" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{hour}h</div>
                  <div className="text-xs font-medium">{count}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
