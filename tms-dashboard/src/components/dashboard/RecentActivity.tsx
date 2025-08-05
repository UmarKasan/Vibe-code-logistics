import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Package, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';


export interface Activity {
  id: string;
  type: 'status_change' | 'new_shipment' | 'collection';
  awbId: string;
  timestamp: string;
  status?: string;
  user?: string;
  description: string;
}

export interface RecentActivityProps {
  activities: Activity[];
  isLoading?: boolean;
  className?: string;
}

const ActivityIcon = ({ type, status }: { type: Activity['type'], status?: string }) => {
  if (type === 'new_shipment') {
    return <Package className="h-4 w-4 text-blue-500" />;
  }
  
  if (type === 'collection') {
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  }
  
  // For status changes
  if (status === 'Delayed') {
    return <AlertTriangle className="h-4 w-4 text-amber-500" />;
  }
  
  return <ArrowRight className="h-4 w-4 text-gray-500" />;
};

export function RecentActivity({ activities, isLoading = false }: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 rounded-full mt-1" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent activity to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            let message = '';
            
            if (activity.type === 'new_shipment') {
              message = `New shipment ${activity.awbId} has arrived`;
            } else if (activity.type === 'collection') {
              message = `AWB ${activity.awbId} has been collected`;
            } else {
              message = `Status of AWB ${activity.awbId} changed to ${activity.status}`;
            }
            
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <ActivityIcon type={activity.type} status={activity.status} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                    {activity.user && <span>by {activity.user}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
