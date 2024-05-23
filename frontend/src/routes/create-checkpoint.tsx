import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-checkpoint')({
  component: () => <div>Hello /create-checkpoint!</div>
})