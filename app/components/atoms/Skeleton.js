export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-app-bg dark:bg-app-surface-dark ${className}`} />
  );
}
