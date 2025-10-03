export async function fetchWord(signal? : AbortSignal){
    try{
        const res = await fetch('http://localhost:8000/api/word',{signal})
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        const data = await res.json()
        return data.word
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any){
        console.error(err)
        if (err.name !== "AbortError"){
          return null
        }
    }
}