import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          {/* Elegant Bar Loader with Blue Theme */}
          <BarLoader
            width={"80%"}
            color="#0a95fb" // Cool Blue Color
            className="rounded-md shadow-md shadow-[#4f46e5]/20"
          />

          {/* Stylish Loading Text with Animation */}
          <p className="text-gray-400 text-lg font-medium animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
