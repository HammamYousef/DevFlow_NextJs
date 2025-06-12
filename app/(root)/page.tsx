import HomeFilter from '@/components/filters/HomeFilter'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import Link from 'next/link'
import React from 'react'


const someQuestions = [
  {
    id: '1',
    title: 'What is Next.js?',
    content: 'Next.js is a React framework that enables server-side rendering and static site generation.',
    tags: ['react', 'nextjs', 'javascript'],
  },
  {
    id: '2',
    title: 'How to use React hooks?',
    content: 'React hooks are functions that let you use state and other React features without writing a class.',
    tags: ['react', 'hooks', 'javascript'],
  },
  {
    id: '3',
    title: 'What is the difference between props and state in React?',
    content: 'Props are read-only and passed from parent to child, while state is mutable and managed within the component.',
    tags: ['react', 'props', 'state'],
  },
]
interface SearchParams {
  searchParams: Promise<{ [key : string] : string }>;
}

const Home = async ({ searchParams } : SearchParams) => {
    const { query = '', filter = '' } = await searchParams;

    const queryFilteredQuestions = someQuestions.filter(question => {
      const matchesQuery = question.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = !filter || question.tags.includes(filter.toLowerCase());
      return matchesQuery && matchesFilter;
    });

  return (
    <> 
      <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center '>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

        <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900' asChild>
          <Link href={ROUTES.ASK_QUESTION}>
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className='mt-11'>
        <LocalSearch route='/' imgSrc='/icons/search.svg' placeholder='Search Questions...' otherClasses='flex-1'/>
      </section>

      <HomeFilter />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {queryFilteredQuestions.map((question) => (
          <div key={question.id}>{question.title}</div>
        ))}
      </div>
    </>
  )
}

export default Home