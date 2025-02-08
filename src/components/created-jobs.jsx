import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-8">
      {loadingCreatedJobs ? (
        <div className="flex flex-col items-center justify-center">
          <BarLoader width={200} color="#0a95fb" />
          <p className="text-gray-400 text-lg font-medium animate-pulse mt-2">
            Fetching jobs...
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdJobs?.length ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={fnCreatedJobs}
                isMyJob
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center text-center text-gray-400 mt-10">
              <p className="text-xl font-semibold mt-4">No Jobs Found 😢</p>
              <p className="text-gray-500">
                Try creating a job to see it here!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
