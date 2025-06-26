import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Metric from "../metric/Metric";
import { Question, Tag } from "@/types/global";
import EditDeleteAction from "../User/EditDeleteAction";

interface QuestionProps {
  question: Question;
  showActionBtns?: boolean;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, votes, answers, views },
  showActionBtns = false,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex-between flex-col-reverse gap-5 sm:flex-row">
        <div className="flex-1">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link
            href={ROUTES.QUESTION(_id)}
            className="text-dark100_light900 hover:text-primary-500 dark:text-light-500 dark:hover:text-primary-500"
          >
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {showActionBtns && <EditDeleteAction type="question" itemId={_id} />}
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgSrc={author.image}
          alt={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          value={author.name}
          href={author._id}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgSrc="/icons/like.svg"
            alt="like"
            title="Votes"
            value={votes.upvotes}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgSrc="/icons/message.svg"
            alt="answers"
            title="Answers"
            value={answers}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgSrc="/icons/eye.svg"
            alt="views"
            title="Views"
            value={views}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
