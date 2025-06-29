import { Job, RouteParams } from "@/types/global";
import { fetchCountries, fetchJobs } from "@/lib/actions/job.action";
import JobsFilter from "@/components/filters/JobFilter";
import JobCard from "@/components/cards/JobCard";
import Pagination from "@/components/Pagination";

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;

  const jobs = await fetchJobs({
    query: `${query}, ${location}` || `Software Engineer in america`,
    page: page ?? 1,
  });

  const countries = await fetchCountries();
  const parsedPage = parseInt(page ?? 1);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs?.length > 0 ? (
          jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs?.length === 10} />
      )}
    </>
  );
};

export default Page;
