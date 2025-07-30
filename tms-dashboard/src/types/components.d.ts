// Type definitions for components
declare module '@/components/dashboard/SummaryCard' {
  import { ReactNode } from 'react';
  
  interface SummaryCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    className?: string;
    isLoading?: boolean;
  }
  
  export const SummaryCard: React.FC<SummaryCardProps>;
}

declare module '@/components/dashboard/StatusDistributionChart' {
  import { ReactNode } from 'react';
  
  interface ChartData {
    name: string;
    value: number;
    color: string;
  }
  
  interface StatusDistributionChartProps {
    data: ChartData[];
    isLoading?: boolean;
  }
  
  export const StatusDistributionChart: React.FC<StatusDistributionChartProps>;
}

declare module '@/components/dashboard/RecentActivity' {
  import { ReactNode } from 'react';
  
  interface Activity {
    id: string;
    type: 'status_change' | 'new_shipment' | 'collection';
    awbId: string;
    timestamp: string;
    status?: string;
    user?: string;
    description: string;
  }
  
  interface RecentActivityProps {
    activities: Activity[];
    isLoading?: boolean;
  }
  
  export const RecentActivity: React.FC<RecentActivityProps>;
}
