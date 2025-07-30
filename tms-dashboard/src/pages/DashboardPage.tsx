import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';
import { simulateStatusChange, fetchAwbs } from '@/api';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { StatusDistributionChart } from '@/components/dashboard/StatusDistributionChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Package, Truck, AlertTriangle, CheckCircle } from 'lucide-react';
import type { AWB } from '@/types';

// Define the status colors and their display names
const STATUS_CONFIG = {
  'Arrived': { color: '#3b82f6', label: 'Arrived' },
  'Ready for Collection': { color: '#f59e0b', label: 'Ready for Collection' },
  'Collected': { color: '#10b981', label: 'Collected' },
  'Delayed': { color: '#ef4444', label: 'Delayed' },
  'Other': { color: '#9ca3af', label: 'Other' },
} as const;

type StatusType = keyof typeof STATUS_CONFIG;

// Helper function to process AWB data for the dashboard
const processAwbData = (awbs: AWB[]) => {
  // Initialize status counts with all possible statuses set to 0
  const statusCounts = Object.keys(STATUS_CONFIG).reduce((acc, status) => {
    acc[status as StatusType] = 0;
    return acc;
  }, {} as Record<StatusType, number>);

  // Count actual status occurrences
  awbs.forEach(awb => {
    const status = (Object.keys(STATUS_CONFIG).includes(awb.status) 
      ? awb.status 
      : 'Other') as StatusType;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Convert to chart data format
  const chartData = Object.entries(statusCounts)
    .filter(([_, value]) => value > 0) // Only include statuses with count > 0
    .map(([status, value]) => ({
      name: STATUS_CONFIG[status as StatusType].label,
      value,
      color: STATUS_CONFIG[status as StatusType].color
    }));

  // Generate recent activities (sorted by most recent first)
  const recentActivities = [...awbs]
    .sort((a, b) => new Date(b.arrivalDateTime).getTime() - new Date(a.arrivalDateTime).getTime())
    .slice(0, 5)
    .map(awb => {
      const status = (Object.keys(STATUS_CONFIG).includes(awb.status) 
        ? awb.status 
        : 'Other') as StatusType;
        
      return {
        id: awb.id,
        type: 'status_change' as const,
        awbId: awb.id,
        timestamp: awb.arrivalDateTime,
        status: STATUS_CONFIG[status].label,
        user: 'System',
        description: `Status changed to ${STATUS_CONFIG[status].label}`
      };
    });

  return { chartData, recentActivities };
};

export default function DashboardPage() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const { data: awbs = [], isLoading } = useQuery<AWB[]>({
    queryKey: ['awbs', user?.id],
    queryFn: () => user ? fetchAwbs(user) : Promise.resolve([]),
    enabled: !!user,
  });

  const { chartData = [], recentActivities = [] } = processAwbData(awbs);

  const totalShipments = awbs.length;
  const pendingShipments = awbs.filter(awb => awb.status === 'Arrived').length;
  const completedShipments = awbs.filter(awb => awb.status === 'Collected').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case 'manager':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manager Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You have full access to all shipments and system analytics.</p>
              <Button asChild disabled> 
                <Link to="/analytics">View Analytics (Coming Soon)</Link>
              </Button>
            </CardContent>
          </Card>
        );
      case 'handler':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ground Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View all incoming shipments and manage their status from the main list.</p>
            </CardContent>
          </Card>
        );
      case 'trucker':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Below are the shipments assigned to your company: <strong>{user.company}</strong>.</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your shipments today
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user.role} @ {user.company || 'TMS Control'}
          </span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Shipments"
          value={isLoading ? '...' : totalShipments}
          icon={<Package className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <SummaryCard
          title="In Transit"
          value={isLoading ? '...' : pendingShipments}
          description="Awaiting collection"
          icon={<Truck className="h-4 w-4" />}
          isLoading={isLoading}
          className="bg-amber-50 dark:bg-amber-900/20"
        />
        <SummaryCard
          title="Completed"
          value={isLoading ? '...' : completedShipments}
          description="This month"
          icon={<CheckCircle className="h-4 w-4" />}
          isLoading={isLoading}
          className="bg-green-50 dark:bg-green-900/20"
        />
        <SummaryCard
          title="Alerts"
          value={isLoading ? '...' : '0'}
          description="Requires attention"
          icon={<AlertTriangle className="h-4 w-4" />}
          isLoading={isLoading}
          className="bg-red-50 dark:bg-red-900/20"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Status Distribution Chart */}
        <div className="lg:col-span-2">
          <StatusDistributionChart 
            data={chartData} 
            isLoading={isLoading} 
          />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity 
            activities={recentActivities} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* Role-Specific Content */}
      <div className="grid gap-6">
        {renderRoleSpecificContent()}

        {user.role === 'manager' && (
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Test real-time notifications and status updates.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      simulateStatusChange();
                      toast.success('Status change simulated');
                    }}
                  >
                    Simulate Status Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

