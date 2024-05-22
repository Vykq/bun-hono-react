import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"


function App() {
  const [totalCheckpoints, setTotalCheckpoints] = useState(0)


  useEffect(() =>{
    async function fetchTotal(){
      const res = await fetch("/api/checkpoints/total");
      const data = await res.json();
      setTotalCheckpoints(data.total);
    }
    fetchTotal();
  }, [])

  return (
    <>
      <Button>Styles ({totalCheckpoints})</Button>
    </>
  )
}

export default App
