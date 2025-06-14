'use client';

import { AskQuestionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MDXEditorMethods } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import TagCard from '../cards/TagCard';

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false
})

const QuestionForm = () => {

    const editorRef = useRef<MDXEditorMethods>(null);

    const form = useForm<z.infer<typeof AskQuestionSchema>>({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    });

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: { value : string[] }) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault();
            const tagInput = e.currentTarget.value.trim();
            if (tagInput && tagInput.length <= 20 && !field.value.includes(tagInput)) {
                form.setValue('tags', [...field.value, tagInput]);
                e.currentTarget.value = ''; 
                form.clearErrors('tags');
            }
            else if (tagInput.length > 20) {
                form.setError('tags', { type: 'manual', message: 'Tag cannot exceed 20 characters.' });
            }
            else if (field.value.includes(tagInput)) {
                form.setError('tags', { type: 'manual', message: 'Tag already exists.' });
            }
        }
    };

    const handleTagRemove = (tag: string, field : { value : string[]}) => {
        const newTags = field.value.filter((t: string) => t !== tag);
        form.setValue('tags', newTags);
        if (newTags.length === 0) {
            form.setError('tags', {
                type: 'manual',
                message: 'At least one tag is required.'
            });
        }
    };

    const handleCreateQuestion = async (data : z.infer<typeof AskQuestionSchema>) => {
        console.log('Form Data:', data);
    }

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
                        <Editor 
                            value={field.value} 
                            editorRef={editorRef}
                            fieldChange={field.onChange}
                        />
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
                                onKeyDown={(e) => handleInputKeyDown(e, field)}
                                
                            />
                            {field.value.length > 0 && (
                                <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                                    {field.value.map((tag : string) => (
                                        <TagCard key={tag} _id={tag} name={tag} compact removeable isButton handleRemove={() => handleTagRemove(tag, field)}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormDescription className='body-regular text-light-500 mt-2.5'>
                        Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
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