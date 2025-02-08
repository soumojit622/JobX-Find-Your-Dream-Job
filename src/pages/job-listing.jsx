import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { Search, Trash2 } from "lucide-react";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 animate-pulse">
          Loading, please wait...
        </h2>
        <BarLoader width="80%" color="#0a95fb" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl md:text-6xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full gap-4 items-center mb-6"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white placeholder-gray-500 
               focus:ring-blue-500 focus:border-blue-500 transition-all 
               hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
        />

        <Button
          type="submit"
          className="w-full sm:w-32 px-6 py-3 text-lg flex items-center justify-center gap-2
         bg-gradient-to-r from-blue-600 to-sky-500 
         text-white font-semibold rounded-md 
         shadow-md shadow-blue-500/20 
         hover:shadow-lg hover:shadow-blue-500/80 
         hover:brightness-110
         transition-all duration-300 ease-in-out"
        >
          <Search size={20} />
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Location Filter */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger
            className="w-full sm:w-1/3 px-4 py-3 bg-gray-900 text-white border border-gray-700 
                        rounded-xl shadow-md  
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all 
               hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
          >
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border border-gray-700 shadow-lg rounded-lg">
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem
                  key={name}
                  value={name}
                  className="px-4 py-2 hover:bg-gray-800 focus:bg-blue-500 focus:text-white transition-all"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company Filter */}
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger
            className="w-full sm:w-1/3 px-4 py-3 bg-gray-900 text-white border border-gray-700 
                        rounded-xl shadow-md  
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all 
               hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
          >
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border border-gray-700 shadow-lg rounded-lg">
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem
                  key={id}
                  value={id}
                  className="px-4 py-2 hover:bg-gray-800 focus:bg-blue-500 focus:text-white transition-all"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        <Button
          className="w-full sm:w-1/4 px-5 py-2.5 text-md font-medium flex items-center justify-center gap-2
         bg-gradient-to-r from-red-500 to-red-700 text-white 
         rounded-md shadow-md transition-all duration-300 
         hover:shadow-red-500/50 hover:brightness-110"
          onClick={clearFilters}
        >
          <Trash2 size={18} />
          Clear Filters
        </Button>
      </div>

      {/* Loader */}
      {loadingJobs && (
        <div className="flex justify-center items-center mt-4 bg-gray-900 rounded-lg p-4 shadow-md shadow-gray-800">
          <BarLoader width="80%" color="#0a95fb" />
        </div>
      )}

      {/* Job Listings */}
      {!loadingJobs && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-12 text-center">
              {/* Bold Message */}
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-400 drop-shadow-lg">
                No Jobs Found
              </span>

              {/* Animated Sad Emoji */}
              <span className="text-6xl sm:text-7xl mt-4 animate-bounce transition-all duration-700">
                😞
              </span>

              {/* Subtext Message */}
              <p className="text-gray-500 text-lg mt-3 px-6 max-w-lg leading-relaxed">
                Oops! No jobs match your search criteria. Try adjusting your
                filters or check back later!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
