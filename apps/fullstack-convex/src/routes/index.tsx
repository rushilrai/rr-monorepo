import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: IndexRouteComponent,
})

function IndexRouteComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Fullstack Convex Boilerplate</h1>

      <Button onClick={() => window.alert('world')}>Hello</Button>
    </div>
  )
}
