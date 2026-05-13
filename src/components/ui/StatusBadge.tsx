import { Badge } from './Badge';

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  healthy: 'success',
  active: 'success',
  completed: 'success',
  attention: 'warning',
  pending: 'warning',
  scheduled: 'info',
  critical: 'danger',
  overdue: 'danger',
  expired: 'neutral',
  skipped: 'neutral',
  none: 'success',
  low: 'success',
  moderate: 'warning',
  high: 'danger',
};

const statusLabels: Record<string, string> = {
  healthy: 'Healthy',
  active: 'Active',
  completed: 'Completed',
  attention: 'Needs Attention',
  pending: 'Pending',
  scheduled: 'Scheduled',
  critical: 'Critical',
  overdue: 'Overdue',
  expired: 'Expired',
  skipped: 'Skipped',
  none: 'None',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={statusVariants[status] || 'neutral'}>
      <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{
        backgroundColor: statusVariants[status] === 'success' ? '#059669' :
          statusVariants[status] === 'warning' ? '#D97706' :
          statusVariants[status] === 'danger' ? '#DC2626' :
          statusVariants[status] === 'info' ? '#2563EB' : '#6B7280'
      }} />
      {statusLabels[status] || status}
    </Badge>
  );
}
