'use client';

import { AskQuestionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const QuestionForm = () => {

    const form = useForm({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    });

    const handleCreateQuestion = async () => {}

  return (
    <Form {...form}>
        <form className='flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateQuestion)}>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Question Title <span className='text-primary-500'>*</span>
                    </FormLabel>
                    <FormControl>
                        <Input
                            className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription className='body-regular text-light-500 mt-2.5'>
                        Be specific and concise. Your title should summarize your question in a few words.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Detailed explanation of your problem <span className='text-primary-500'>*</span>
                    </FormLabel>
                    <FormControl>
                        Editor
                    </FormControl>
                    <FormDescription className='body-regular text-light-500 mt-2.5'>
                        Introduce the problem and expand on the details. Include any relevant information that can help others understand your question better.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        Tags <span className='text-primary-500'>*</span>
                    </FormLabel>
                    <FormControl>
                        <div>
                            <Input
                                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                                placeholder='Add tags to your question'
                                {...field}
                            />
                            Tags
                        </div>
                    </FormControl>
                    <FormDescription className='body-regular text-light-500 mt-2.5'>
                        Add relevant tags to categorize your question. This helps others find and answer your question more easily.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className='mt-16 flex justify-end'>
                <Button type='submit' className='primary-gradient !text-light-900 w-fit'>
                    Ask A Question
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default QuestionForm