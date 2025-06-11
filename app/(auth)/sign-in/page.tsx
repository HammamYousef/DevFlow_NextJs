'use client';

import AuthForm from '@/components/forms/AuthForm'
import { SignInSchema } from '@/lib/validation'
import React from 'react'

const SignIn = () => {
  return (
    <AuthForm
      formType='SIGN_IN'
      schema={SignInSchema}
      defaultValues={{
        email: '',
        password: '',
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(data: any) => Promise.resolve({success: true, data})}
    />
  )
}

export default SignIn