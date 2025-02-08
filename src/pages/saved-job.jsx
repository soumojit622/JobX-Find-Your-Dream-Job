import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          {/* Stylish Bar Loader */}
          <BarLoader
            width={"80%"}
            color="#0a95fb" // Cool Blue Color
            className="rounded-md shadow-md shadow-[#4f46e5]/20"
          />

          {/* Loading Text */}
          <p className="text-gray-400 text-lg font-medium animate-pulse">
            Loading your saved jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
      {" "}
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>
      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs?.length ? (
            savedJobs?.map((saved) => (
              <JobCard
                key={saved.id}
                job={saved?.job}
                onJobAction={fnSavedJobs}
                savedInit={true}
              />
            ))
          ) : (
            <div className="text-gray-400 text-center text-xl">
              No Saved Jobs 👀
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
