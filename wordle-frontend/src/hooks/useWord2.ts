import { useState, useEffect } from "react";
import { fetchWord } from "../services/fetchWord";

// custom hook
export function useWord() {
  const [word, setWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function getWord(signal?: AbortSignal){
    setIsLoading(true)
    setError("")
    try{
      const data = await fetchWord(signal)
      if(data === null){
        setError('Failed to fetch word')
      }
      setWord(data)
    }catch(err){
      console.log(err)
      if(err instanceof Error){
        setError(err.message)
      } else {
        setError(String(err))
      }
    }finally{
        setIsLoading(false)
    }
  }

  useEffect(()=>{
    const controller  = new AbortController()
    getWord(controller.signal)

    return () => {
      controller.abort()
    }
  },[])

  return { word, isLoading, error, refetch: getWord };
}


  
