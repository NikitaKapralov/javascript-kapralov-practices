import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { ReposList } from './pages/ReposList/ReposList'
import { RepoDetails } from './pages/RepoDetails/RepoDetails'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ReposList,
})

const repoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/repo/$owner/$name',
  component: RepoDetails,
})

const routeTree = rootRoute.addChildren([indexRoute, repoRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}