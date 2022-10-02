export interface UserI{
    _id:string,
    username:string,
    email:string
}



export interface AuthContextI{
    user?:UserI,
    setUser:(user?:UserI)=>void 
}