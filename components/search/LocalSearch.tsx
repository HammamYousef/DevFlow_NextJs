'use client';

import Image from 'next/image';
import { Input } from '../ui/input'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';
import { useDebounce } from 'use-debounce';

interface LocalSearchProps {
  route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses} : LocalSearchProps) => {
  
    const pathName = usePathname(); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const [searchQuery, setSearchQuery] = useState(query);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'query',
                value: searchQuery
            })
            router.push(newUrl, {scroll: false});
        }else {
            if (pathName === route){
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                });
                router.push(newUrl, {scroll: false});
            }
        }
        
    }, [debouncedSearchQuery, searchParams, router, route]);

    return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>        
        <Image 
            src={imgSrc}
            alt='Search Icon'
            width={24}
            height={24}
            className='cursor-pointer'
        />

        <Input
            type='text'
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none !bg-transparent'
        />
    </div>
  )
}

export default LocalSearch