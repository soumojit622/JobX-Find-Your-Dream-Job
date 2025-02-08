/* eslint-disable react/prop-types */
import { EyeIcon, Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-blue-500/50 border border-gray-700 backdrop-blur-lg mb-6">

      {/* Loading Bar */}
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#0a95fb" />
      )}

      {/* Card Header */}
      <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <CardTitle className="text-lg font-bold flex items-center gap-3">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={20}
              className="text-red-400 cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex flex-col gap-4 flex-1 p-6">
        <div className="flex justify-between items-center">
          {/* Company Logo */}
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={`${job.company.name} Logo`}
              className="h-8 w-auto object-contain rounded-md"
            />
          )}

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPinIcon size={18} className="text-blue-400" />
            {job.location}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700" />

        {/* Job Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {job.description.substring(0, job.description.indexOf("."))}.
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-700">
        {/* More Details Button */}
        <Link to={`/job/${job.id}`} className="w-full sm:w-auto flex-1">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transform"
          >
            <EyeIcon size={18} className="text-white" /> More Details
          </Button>
        </Link>

        {/* Save Job Button */}
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-full sm:w-auto px-4 py-2 flex items-center justify-center gap-2 border border-gray-600 hover:border-red-500 hover:text-red-400 transition-all duration-300 rounded-lg shadow-md hover:shadow-red-500/50 transform "
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <>
                <Heart
                  size={22}
                  fill="red"
                  stroke="red"
                  // className="animate-pulse"
                />
                <span className="hidden sm:inline">Saved</span>
              </>
            ) : (
              <>
                <Heart
                  size={22}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                />
                <span className="hidden sm:inline">Save</span>
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
