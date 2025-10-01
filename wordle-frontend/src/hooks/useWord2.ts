import { useState, useCallback, useEffect } from "react";
import { fetchWord } from "../services/fetchWord";

// custom hook
export function useWord() {
  const [word, setWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function getWord(){
    setIsLoading(true)
    setError("")
    try{
      const data = await fetchWord()
      setWord(data)
    }catch(err){
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
    getWord()
  },[])

  return { word, isLoading, error, refetch: getWord };
}


  
