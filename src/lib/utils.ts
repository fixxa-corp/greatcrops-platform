export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function daysFromNow(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function cropTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    avocado: 'Avocado',
    almond: 'Almond',
    citrus: 'Citrus',
    grape: 'Wine Grapes',
  };
  return labels[type] || type;
}

export function cropTypeColor(type: string): string {
  const colors: Record<string, string> = {
    avocado: 'bg-green-600 text-white',
    almond: 'bg-amber-600 text-white',
    citrus: 'bg-orange-500 text-white',
    grape: 'bg-purple-600 text-white',
  };
  return colors[type] || 'bg-gray-500 text-white';
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    healthy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    attention: 'bg-amber-100 text-amber-800 border-amber-200',
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
    overdue: 'bg-red-100 text-red-800 border-red-200',
    expired: 'bg-gray-100 text-gray-600 border-gray-200',
    skipped: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-600 border-gray-200';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
