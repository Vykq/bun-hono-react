import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"


function App() {
  const [totalCheckpoints, setTotalCheckpoints] = useState(0)


  useEffect(() =>{
    fetch("/api/checkpoints/total")
  }, [])

  return (
    <>
      <Button>Styles ({totalCheckpoints})</Button>
    </>
  )
}

export default App
