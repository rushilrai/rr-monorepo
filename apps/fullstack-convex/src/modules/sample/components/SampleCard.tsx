import type { Doc } from '@convex/_generated/dataModel'

interface SampleCardProps {
  sample: Doc<'samples'>
}

export function SampleCard({ sample }: SampleCardProps) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <p className="font-medium">{sample.title}</p>
      <p className="text-sm text-muted-foreground">{sample.data}</p>
      <p className="text-xs text-muted-foreground">
        {new Date(sample.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
