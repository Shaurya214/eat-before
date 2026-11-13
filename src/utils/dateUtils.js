/**
 * Date calculation utility strictly adhering to ExpiryAlert PRD specifications:
 * US-002:
 * - Expired (< 0 days): Red
 * - Expiring Soon (0 to 3 days): Orange
 * - Upcoming (4 to 7 days): Yellow
 * - Fresh (> 7 days): Green
 */

export const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const calculateDaysRemaining = (expiryDateStr) => {
  if (!expiryDateStr) return 0;
  
  // Normalize both dates to midnight local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = expiryDateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  targetDate.setHours(0, 0, 0, 0);

  const diffMs = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getExpiryStatus = (expiryDateStr) => {
  const days = calculateDaysRemaining(expiryDateStr);

  if (days < 0) {
    return {
      status: 'expired',
      days,
      label: days === -1 ? 'Expired yesterday' : `Expired ${Math.abs(days)}d ago`,
      badgeLabel: 'Expired',
      badgeColor: 'bg-error-container text-on-error-container',
      dotColor: 'bg-status-danger',
      borderLeftColor: 'border-l-status-danger',
      indicatorColor: 'text-error',
      severity: 4,
    };
  }

  if (days === 0) {
    return {
      status: 'warning',
      days,
      label: 'Expires Today!',
      badgeLabel: 'Expiring Today',
      badgeColor: 'bg-error-container text-on-error-container',
      dotColor: 'bg-status-danger',
      borderLeftColor: 'border-l-status-danger',
      indicatorColor: 'text-error',
      severity: 3,
    };
  }

  if (days <= 3) {
    return {
      status: 'warning',
      days,
      label: days === 1 ? 'Expiring Tomorrow (1d left)' : `Expiring in ${days} days`,
      badgeLabel: 'Expiring Soon',
      badgeColor: 'bg-status-warning/15 text-tertiary-container',
      dotColor: 'bg-status-warning',
      borderLeftColor: 'border-l-status-warning',
      indicatorColor: 'text-status-warning',
      severity: 2,
    };
  }

  if (days <= 7) {
    return {
      status: 'upcoming',
      days,
      label: `${days} days left`,
      badgeLabel: 'Upcoming',
      badgeColor: 'bg-tertiary-fixed/40 text-on-tertiary-fixed-variant',
      dotColor: 'bg-status-upcoming',
      borderLeftColor: 'border-l-status-upcoming',
      indicatorColor: 'text-status-upcoming',
      severity: 1,
    };
  }

  return {
    status: 'fresh',
    days,
    label: `${days} days left`,
    badgeLabel: 'Fresh',
    badgeColor: 'bg-secondary-container text-on-secondary-container',
    dotColor: 'bg-status-fresh',
    borderLeftColor: 'border-l-status-fresh',
    indicatorColor: 'text-status-fresh',
    severity: 0,
  };
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
