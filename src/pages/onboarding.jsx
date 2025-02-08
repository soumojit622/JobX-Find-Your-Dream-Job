/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { UserRound, Briefcase } from "lucide-react"; // Import relevant icons
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };
  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-4 animate-pulse">
          Loading, please wait...
        </h2>
        <BarLoader
          width={"80%"}
          color="#0a95fb"
          className="rounded-md shadow-md shadow-teal-500/20"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      {/* Animated Gradient Heading */}
      <h2
        className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight 
                   bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 
                   text-transparent bg-clip-text animate-gradient"
      >
        I am a...
      </h2>

      {/* Centered Card with Glassmorphism */}
      <div
        className="mt-14 flex flex-col sm:flex-row gap-8 w-full max-w-3xl 
                   bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-lg shadow-blue-500/10 border border-white/10"
      >
        {/* Candidate Button */}
        <Button
          variant="blue"
          className="w-full sm:w-1/2 flex items-center justify-center gap-3 py-5 px-8 text-xl font-semibold tracking-wide 
                     bg-gradient-to-r from-sky-500 to-blue-700 text-white rounded-2xl
                     shadow-md shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-500/70 
                     transform transition-all duration-300 ease-in-out"
          onClick={() => handleRoleSelection("candidate")}
        >
          <UserRound className="w-6 h-6" /> Candidate
        </Button>

        {/* Recruiter Button */}
        <Button
          variant="destructive"
          className="w-full sm:w-1/2 flex items-center justify-center gap-3 py-5 px-8 text-xl font-semibold tracking-wide 
                     bg-gradient-to-r from-red-500 to-rose-700 text-white rounded-2xl
                     shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-600/70 
                    transform transition-all duration-300 ease-in-out"
          onClick={() => handleRoleSelection("recruiter")}
        >
          <Briefcase className="w-6 h-6" /> Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
