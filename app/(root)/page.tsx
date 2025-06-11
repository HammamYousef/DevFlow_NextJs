import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import React from 'react'

const Home = async () => {
  
  const session = await auth();

  console.log("Session Data:", session);
  
  return (
    <>
      <h1 className="h1-bold">Welcome to the world of Next.Js</h1>
    
      <form action={async () => {
        "use server";

        await signOut({
          redirectTo:ROUTES.SIGN_IN
        });
      }} className='px-10 pt-[100px]'>
        <Button type="submit">Log out</Button>
      </form>
    </>
  )
}

export default Home