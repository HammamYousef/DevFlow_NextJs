import { auth } from '@/auth'
import React from 'react'

const Home = async () => {
  
  const session = await auth();

  console.log("Session Data:", session);
  
  return (
    <>    
      <h1>Next</h1>
    </>
  )
}

export default Home