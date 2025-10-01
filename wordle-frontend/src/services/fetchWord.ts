export async function fetchWord(){
    try{
        const res = await fetch('http://localhost:8000/api/word')
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        const data = await res.json()
        return data.word
    } catch (err){
        console.log(err)
    }
}