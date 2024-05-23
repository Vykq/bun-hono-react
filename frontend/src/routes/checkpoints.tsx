import { createFileRoute } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"

import {
  useQuery
} from '@tanstack/react-query'

import { api } from '@/lib/api'

export const Route = createFileRoute('/checkpoints')({
  component: Checkpoints,
})


async function getTotalCheckpoints() {
  const res = await api.checkpoints['total'].$get();
  if(!res.ok){
    throw new Error("server error");
  }
  const data = await res.json();
  console.log(data)
  return data;
}


function Checkpoints() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-checkpoints'],
    queryFn: getTotalCheckpoints,
  });

  if (error) return 'An error: ' + error.message;

  return(
    <div className="checkpoints max-w-7xl mx-auto py-4 px-4">
      <div className="flex justify-between">
        <div>
          <h1 className='text-3xl font-bold	'>Total checkpoints</h1>
          <p>Loaded {isPending? "..." : data.total} checkpoints</p>
        </div>
        <Button>Add new Checkpoint</Button>
      </div>
    </div>
  )
}