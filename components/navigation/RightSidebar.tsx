import ROUTES from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TagCard from '../cards/TagCard'

const hotQuestions = [
    { _id:'1', title: 'How to use React Hooks?'},
    { _id:'2', title: 'What is the best way to learn JavaScript?'},
    { _id:'3', title: 'How to optimize performance in React applications?'},
    { _id:'4', title: 'What are the differences between var, let, and const?'},
    { _id:'5', title: 'How to handle state management in large applications?'},
]

const popularTags = [
    { _id: '1', name: 'JavaScript', questions: 120 },
    { _id: '2', name: 'React', questions: 95 },
    { _id: '3', name: 'CSS', questions: 80 },
    { _id: '4', name: 'Node.js', questions: 65 },
    { _id: '5', name: 'Python', questions: 50 },
]

const RightSidebar = () => {
  return (
    <aside className='pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
            <div className='mt-7 w-full flex flex-col gap-[30px]'>
                {hotQuestions.map(({ _id, title }) => (
                    <Link href={ROUTES.PROFILE(_id)} key={_id} className='flex-between cursor-pointer gap-7'>
                        <p className='body-medium text-dark500_light700'>{title}</p>
                        <Image src={'/icons/chevron-right.svg'} alt='Chevron Right Icon' width={20} height={20} className='invert-colors' />
                    </Link>
                ))}
            </div>
        </div>

        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>

            <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map(({ _id, name, questions}) => (
                    <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
                ))}
            </div>
        </div>
    </aside>
  )
}

export default RightSidebar