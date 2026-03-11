import { ConvexProvider, ConvexReactClient } from 'convex/react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import styles from '../index.css?url'
import type { QueryClient } from '@tanstack/react-query'
import type { ConvexQueryClient } from '@convex-dev/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Fullstack Convex',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles,
      },
    ],
  }),
  shellComponent: RootComponent,
})

function RootComponent() {
  const { convexQueryClient } = Route.useRouteContext()

  return (
    <RootDocument>
      <ConvexProvider client={convexQueryClient.convexClient}>
        <Outlet />
      </ConvexProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body className="h-screen">
        {children}

        <Scripts />
      </body>
    </html>
  )
}
