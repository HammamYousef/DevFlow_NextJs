import QuestionCard from '@/components/cards/QuestionCard'
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
    tags: [
      { id: '1', name: 'react' },
      { id: '2', name: 'nextjs' },
      { id: '3', name: 'javascript' }
    ],
    author: {
      id: '1',
      name: 'John Doe',
      profilePictureUrl: 'https://tse1.mm.bing.net/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?rs=1&pid=ImgDetMain'
    },
    createdAt: new Date('2024-06-01T10:00:00Z'),
    upvotes: 12,
    answers: 3,
    views: 120,
  },
  {
    id: '2',
    title: 'How to use React hooks?',
    tags: [
      { id: '1', name: 'react' },
      { id: '4', name: 'hooks' },
      { id: '3', name: 'javascript' }
    ],
    author: {
      id: '2',
      name: 'Jane Smith',
      profilePictureUrl: 'https://tse1.mm.bing.net/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?rs=1&pid=ImgDetMain'
    },
    createdAt: new Date('2024-06-05T14:30:00Z'),
    upvotes: 8,
    answers: 2,
    views: 90,
  },
  {
    id: '3',
    title: 'What is the difference between props and state in React?',
    tags: [
      { id: '1', name: 'react' },
      { id: '5', name: 'props' },
      { id: '6', name: 'state' }
    ],
    author: {
      id: '3',
      name: 'Alice Johnson',
      profilePictureUrl: 'https://tse1.mm.bing.net/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?rs=1&pid=ImgDetMain'
    },
    createdAt: new Date('2024-06-10T09:15:00Z'),
    upvotes: 15,
    answers: 5,
    views: 200,
  },
]
interface SearchParams {
  searchParams: Promise<{ [key : string] : string }>;
}

const Home = async ({ searchParams } : SearchParams) => {
    const { query = '', filter = '' } = await searchParams;

    const queryFilteredQuestions = someQuestions.filter(question => {
      const matchesQuery = question.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = !filter || question.tags.some(tag => tag.name.toLowerCase() === filter.toLowerCase());
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
          <div key={question.id}>
            <QuestionCard key={question.id} question={question}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home