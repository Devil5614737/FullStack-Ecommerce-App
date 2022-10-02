import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { request } from "../api/request";
import toast, { Toaster } from 'react-hot-toast';

interface PropsI {
  hide: (setShowSignup: boolean) => void;
}

const Signup = ({ hide }: PropsI) => {
  const router=useRouter()
  const[username,setUsername]=useState<string>("");
  const[email,setEmail]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const[loading,setLoading]=useState<boolean>(false)

 const handleSignup=async(e:Event)=>{
  e.preventDefault();
  setLoading(true)
  const {data}=await request.post('/signup',{username,email,password})
  if(data){
    setLoading(false)
    toast.success("user created!!! ")

    setTimeout(()=>{
      hide(false)
    },1000)
  }

 }


  return (
  <>
    <Card style={{ width: "24rem" }} className="p-4">
      <Card.Title className="my-3">Signup</Card.Title>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.currentTarget.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)}/>
        </Form.Group>
      
        
        <Button onClick={handleSignup as any} className="w-100" variant="primary" type="submit">
         {loading?<Spinner animation="border" size='sm' />:"Signup"}
        </Button>
        <Form.Text className="text-muted  mt-2 d-inline-block">
          Have an account?{" "}
          <span
            style={{ fontWeight: "bold", color: "black", cursor: "pointer" }}
            onClick={() => hide(false)}
          >
            Login
          </span>
        </Form.Text>
      </Form>
    </Card>
    <Toaster position="top-center"
      toastOptions={{
        duration:2000,
        style: {
          background: '#009432',
          color: '#fff',
        },
      }}
      
      />
  </>
  );
};

export default Signup;
