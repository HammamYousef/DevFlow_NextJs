import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "../User/UserAvatar";

interface MetricProps {
  imgSrc: string;
  alt?: string;
  title?: string;
  value: string | number;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

const Metric = ({
  imgSrc,
  alt = "avatar",
  title,
  value,
  href,
  textStyles,
  imgStyles,
  isAuthor,
  titleStyles,
}: MetricProps) => {
  const metricContent = (
    <>
      {isAuthor ? (
        <UserAvatar
          id={href ?? ""}
          className="h-5 w-5"
          name={alt ?? ""}
          imageUrl={imgSrc}
          key={href ?? ""}
          fallbackClassName="text-xs"
        />
      ) : (
        <Image
          src={imgSrc}
          width={16}
          height={16}
          alt={alt}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      )}

      <p className={`flex items-center gap-1 ${textStyles}`}>
        {value}
        {title ? (
          <span
            className={cn(
              `small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`,
              titleStyles
            )}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href && !isAuthor ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
