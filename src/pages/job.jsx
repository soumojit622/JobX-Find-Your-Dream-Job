/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Briefcase,
  ClipboardList,
  DoorClosed,
  DoorOpen,
  MapPin,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

import ApplicationCard from "@/components/application-card";
import { ApplyJobDrawer } from "@/components/apply-job";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <BarLoader
            width={"80%"}
            color="#0a95fb"
            className="shadow-md shadow-blue-500/50 rounded-md animate-pulse"
          />
          <p className="text-gray-400 text-lg font-semibold animate-fade-in">
            Loading job details, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 mt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 text-white mb-12">
      {/* Title & Company Logo */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left tracking-tight text-gray-100">
          {job?.title}
        </h1>
        <div className="flex items-center justify-center p-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md">
          <img
            src={job?.company?.logo_url}
            className="h-14 sm:h-16 md:h-20 object-contain rounded-md"
            alt={job?.title}
          />
        </div>
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-sm">
          <MapPin className="w-6 h-6 text-gray-400" />
          <span className="text-base sm:text-lg text-gray-300">
            {job?.location}
          </span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-sm">
          <Briefcase className="w-6 h-6 text-gray-400" />
          <span className="text-base sm:text-lg text-gray-300">
            {job?.applications?.length} Applicants
          </span>
        </div>
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${
            job?.isOpen
              ? "bg-green-500/30 border-green-500"
              : "bg-red-500/30 border-red-500"
          }`}
        >
          {job?.isOpen ? (
            <>
              <DoorOpen className="w-6 h-6 text-green-400" />
              <span className="text-base sm:text-lg font-medium text-green-400">
                Open
              </span>
            </>
          ) : (
            <>
              <DoorClosed className="w-6 h-6 text-red-400" />
              <span className="text-base sm:text-lg font-medium text-red-400">
                Closed
              </span>
            </>
          )}
        </div>
      </div>

      {/* Hiring Status (For Recruiters) */}
      {job?.recruiter_id === user?.id && (
        <div className="w-full max-w-md mx-auto">
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-full mt-4 px-5 py-3 text-lg font-medium rounded-lg border shadow-sm transition-all duration-300 ${
                job?.isOpen
                  ? "bg-gray-800 border-green-500 text-green-400"
                  : "bg-gray-800 border-red-500 text-red-400"
              }`}
            >
              <SelectValue
                placeholder={`Hiring Status: ${
                  job?.isOpen ? "Open" : "Closed"
                }`}
              />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700 text-white rounded-lg shadow-md">
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Job Description */}
      <h2 className="text-2xl sm:text-3xl font-bold mt-12 text-white border-b-2 border-blue-500 pb-3 flex items-center gap-3">
        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> About the
        Job
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-lg shadow-md border border-gray-700">
        {job?.description}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold mt-12 text-white border-b-2 border-blue-500 pb-3 flex items-center gap-3">
        <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> What
        We Are Looking For
      </h2>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-lg shadow-md border border-gray-700">
        <MDEditor.Markdown
          source={job?.requirements}
          className="bg-transparent text-base sm:text-lg text-gray-300"
        />
      </div>

      {/* Apply Button (For Non-Recruiters) */}
      {job?.recruiter_id !== user?.id && (
        <div className="mt-10 flex justify-center">
          <ApplyJobDrawer
            job={job}
            user={user}
            fetchJob={fnJob}
            applied={job?.applications?.find(
              (ap) => ap.candidate_id === user.id
            )}
          />
        </div>
      )}

      {/* Loader for Hiring Status Update */}
      {loadingHiringStatus && (
        <div className="mt-6 flex justify-center">
          <BarLoader width={"100%"} color="#36d7b7" className="animate-pulse" />
        </div>
      )}

      {/* Applications List (For Recruiters) */}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="mt-14">
          <h2 className="font-semibold text-2xl sm:text-3xl text-gray-100 border-b pb-2 border-gray-700">
            Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {job?.applications.map((application) => (
              <div
                key={application.id}
                className="bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-700"
              >
                <ApplicationCard application={application} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
