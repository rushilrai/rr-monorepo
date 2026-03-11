import { useSamplesQuery } from '../queries'

export function SampleList() {
  const { data, isLoading, error } = useSamplesQuery()

  if (isLoading) {
    return <div className="text-muted-foreground">Loading samples...</div>
  }

  if (error) {
    return <div className="text-destructive">Failed to load samples</div>
  }

  if (!data?.samples.length) {
    return <div className="text-muted-foreground">No samples yet</div>
  }

  return (
    <ul className="space-y-2">
      {data.samples.map((sample) => (
        <li
          key={sample.id}
          className="rounded-md border border-border bg-card p-3"
        >
          <p className="font-medium">{sample.data}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(sample.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )
}
