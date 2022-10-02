import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../public/95029-success.json";

function Success() {
    const router=useRouter()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      
    },
  };
  
  useEffect(()=>{
    setTimeout(()=>{
        router.push('/products')
    },100)
  },[router])

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
      <p className="text-center" style={{fontWeight:500,fontSize:22}}>Purchase Successfull</p>
    </div>
  );
}

export default Success;
