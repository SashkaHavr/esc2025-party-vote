import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vote/results')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vote/results"!</div>
}
