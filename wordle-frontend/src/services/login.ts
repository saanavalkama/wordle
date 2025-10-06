import axios from "axios"

type LoginResponse = {
    token: string,
    username: string,
    avatarUrl: string,
    id: string
}

export async function login(username: string, password:string):Promise<LoginResponse>{
    try{
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password
      })
      console.log(res)
      const {token, username: returnedUsername, avatarUrl,id} = res.data
      return {token, username: returnedUsername, avatarUrl, id}
      
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err:any){
      if(axios.isAxiosError(err)){
        throw new Error(err.response?.data?.message || 'Login failed')
      }
      throw new Error("Unexpcted error occured")
    }
}