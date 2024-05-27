import { createFileRoute } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'


export const Route = createFileRoute('/checkpoints/$checkpointId')({
  // In a loader
  loader: ({ params }) => getCurrentCheckpoint(params.id),
  // Or in a component
  component: PostComponent,
})


async function getCurrentCheckpoint() {
  const res = await api.checkpoints[{postId}].$get();
  if(!res.ok){
    throw new Error("server error");
  }
  const data = await res.json();
  // console.log(data)
  return data;
}


function PostComponent() {

  const { isPending, error, data } = useQuery({
    queryKey: ['get-current-checkpoint'],
    queryFn: getCurrentCheckpoint,
  });
;
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}