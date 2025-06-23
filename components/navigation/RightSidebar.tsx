import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const {
    success: tagSuccess,
    data: TopTags,
    error: tagError,
  } = await getTopTags();

  return (
    <aside className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }, index) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex items-start cursor-pointer gap-2.5"
                >
                  <Image
                    src={
                      index % 2 === 0
                        ? "/icons/hotQuestionOrange.svg"
                        : "/icons/hotQuestionBlue.svg"
                    }
                    alt="hot question icon"
                    width={20}
                    height={20}
                  />

                  <p className="body-medium text-sm text-dark500_light700 line-clamp-2">
                    {title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <DataRenderer
          data={TopTags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          success={tagSuccess}
          error={tagError}
          render={(tags) => (
            <div className="mt-7 flex flex-col gap-4">
              {tags.map(({ _id, name, questionsCount }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questionsCount={questionsCount}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </aside>
  );
};

export default RightSidebar;
