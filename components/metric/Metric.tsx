import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgSrc?: string;
  alt?: string;
  title?: string;
  value: string | number;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgSrc = '/icons/avatar.svg',
  alt = 'avatar',
  title,
  value,
  href,
  textStyles,
  imgStyles,
  isAuthor,
}: MetricProps) => {

    const metricContent = (
        <>
            <Image src={imgSrc} width={16} height={16} alt={alt} className={`rounded-full object-contain ${imgStyles}`}/>
        
            <p className={`flex items-center gap-1 ${textStyles}`}>
                {value}
                <span className={`small-regular line-clamp-1 ${ isAuthor ? 'max-sm:hidden' : '' }`}>
                    {title}
                </span>
            </p>
        </>
    )

  return (
    href ? (
        <Link className="flex-center gap-1" href={href}>
            {metricContent}
        </Link>
    ) : (
        <div className="flex-center gap-1">
            {metricContent}
        </div>
    )
  );
};

export default Metric;
