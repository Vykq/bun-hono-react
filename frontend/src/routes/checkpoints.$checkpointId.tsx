import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkpoints/$checkpointId')({
  // In a loader
  loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}