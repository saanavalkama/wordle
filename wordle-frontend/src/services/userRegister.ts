import axios from "axios"

type RegisterResponse = {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export async function registerUser(username:string, password:string):Promise<RegisterResponse>{
    const avatarUrl =  `https://api.dicebear.com/7.x/initials/svg?seed=${username}`
  try{
    const res = await axios.post('http://localhost:8000/api/auth/register', {username,password,avatarUrl})
    return { status: res.status, data: res.data };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(err:any){
    if(err.response){
      return { status: err.response.status, data: err.response.data }   
    }
    return { status: 500, data: { message: 'Unknown error occurred' } };
  }
}