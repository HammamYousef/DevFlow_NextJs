'use client';

import AuthForm from '@/components/forms/AuthForm'
import { SignUpSchema } from '@/lib/validation'
import React from 'react'

const SignUp = () => {
  return (
    <AuthForm
      formType='SIGN_UP'
      schema={SignUpSchema}
      defaultValues={{
        email: '',
        password: '',
        name: '',
        username: '',
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(data: any) => Promise.resolve({success: true, data})}
    />
  )
}

export default SignUp