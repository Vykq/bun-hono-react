import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from "@/components/ui/button"

import { Skeleton } from "@/components/ui/skeleton"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export const Route = createFileRoute('/checkpoints/')({
  component: Checkpoints,
})


async function getTotalCheckpoints() {
  const res = await api.checkpoints['total'].$get();
  if(!res.ok){
    throw new Error("server error");
  }
  const data = await res.json();
  // console.log(data)
  return data;
}

async function getAllCheckpoints(){
  const res = await api.checkpoints.$get();
  if(!res.ok){
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
  
}


function Checkpoints() {
  const { isPending:isPendingTotal, error: errorTotal, data: total } = useQuery({
    queryKey: ['get-total-checkpoints'],
    queryFn: getTotalCheckpoints,
  });
;
  const { isPending: isPendingCP, error:errorCP, data:checkpoints } = useQuery({
    queryKey: ['get-all-checkpoints'],
    queryFn: getAllCheckpoints,
  });

  if (errorTotal) return 'An error: ' + errorTotal.message;
  if (errorCP) return 'An error: ' + errorCP.message;
  return(
    <>
    <div className="checkpoints max-w-7xl mx-auto py-4 px-4">
      <div className="flex justify-between">
        <div>
          <h1 className='text-3xl font-bold	'>Total checkpoints</h1>
          <p>Loaded {isPendingTotal? "..." : total.total} checkpoints</p>
        </div>
        <Link to="/checkpoints/create" className={buttonVariants({ variant: "" })}>Add new Checkpoint</Link>
      </div>
    </div>
    <div className="all-checkpoints max-w-7xl mx-auto">
    <Table>
      <TableCaption>A list of checkpoints.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Checkpoint</TableHead>
          <TableHead>Real name</TableHead>
          <TableHead>For Premium?</TableHead>
          <TableHead>For Logged In?</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPendingCP
          ? Array(3).fill(0).map((_, i) =>(
            <TableRow key={i}>
            <TableCell><Skeleton className="w-full h-[30px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-full h-[30px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-full h-[30px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-full h-[30px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="w-full h-[30px] rounded-full" /></TableCell>
        </TableRow>
          ))
           : checkpoints?.checkpoints.map((checkpoint) => (
              <TableRow key={checkpoint.id}>
                  <TableCell className="font-medium">{checkpoint.title}</TableCell>
                  <TableCell>{checkpoint.realname}</TableCell>
                  <TableCell>{checkpoint.forPremium? "Yes" : "No"}</TableCell>
                  <TableCell>{checkpoint.forLogged? "Yes" : "No"}</TableCell>
                  <TableCell className='text-right'><Link to={`/checkpoints/${checkpoint.id}`} className={buttonVariants({ variant: "" })}>Edit</Link></TableCell>
              </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </>
  )
}