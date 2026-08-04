type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-md border border-border px-3 py-2">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold">{value}</dd>
    </div>
  );
}
