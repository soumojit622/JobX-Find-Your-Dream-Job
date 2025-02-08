/* eslint-disable react-hooks/exhaustive-deps */
import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <BarLoader width="80%" color="#0a95fb" className="shadow-md" />
        <p className="mt-3 text-lg font-semibold text-gray-300 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="px-6 sm:px-12 lg:px-24">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input
          placeholder="Job Title"
          {...register("title")}
          className="w-full sm:flex-1 px-5 py-3 text-lg text-white 
         bg-gray-900 border border-gray-700 rounded-xl 
         focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
         placeholder-gray-400 transition-all duration-300 ease-in-out
         shadow-md shadow-gray-800/30 hover:shadow-lg hover:shadow-gray-700/50"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea
          placeholder="Job Description"
          {...register("description")}
          className="w-full sm:flex-1 px-5 py-3 text-lg text-white 
         bg-gray-900 border border-gray-700 rounded-xl 
         focus:ring-2 focus:ring-blue-500 focus:border-blue-400 
         placeholder-gray-400 transition-all duration-300 ease-in-out
         shadow-md shadow-gray-800/30 hover:shadow-lg hover:shadow-gray-700/50"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                className="w-full text-white bg-gray-900 border border-gray-700 
                 rounded-lg focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-400 transition-all duration-300 
                 ease-in-out shadow-md shadow-gray-800/30 
                 hover:shadow-lg hover:shadow-gray-700/50"
              >
                <SelectTrigger
                  className="bg-gray-900 text-white border border-gray-700 
                                rounded-lg px-4 py-2 focus:ring-2 
                                focus:ring-blue-500 focus:border-blue-400"
                >
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 rounded-lg ">
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem
                        key={name}
                        value={name}
                        className="px-4 py-2 text-white hover:bg-gray-800 transition-all"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                className="w-full text-white bg-gray-900 border border-gray-700 
                 rounded-lg focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-400 transition-all duration-300 
                 ease-in-out shadow-md shadow-gray-800/30 
                 hover:shadow-lg hover:shadow-gray-700/50"
              >
                <SelectTrigger
                  className="bg-gray-900 text-white border border-gray-700 
                                rounded-lg px-4 py-2 focus:ring-2 
                                focus:ring-blue-500 focus:border-blue-400"
                >
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 rounded-lg">
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem
                        key={id}
                        value={id}
                        className="px-4 py-2 text-white hover:bg-gray-800 transition-all"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errors.errorCreateJob && (
          <p className="text-red-500">{errors?.errorCreateJob?.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && <BarLoader width={"100%"} color="#0a95fb" />}
        <Button
          type="submit"
          variant="blue"
          size="lg"
          className="mt-2 px-6 py-3 text-lg font-semibold text-white 
             bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg 
             flex items-center gap-2 justify-center
             transition-all duration-300 ease-in-out shadow-md 
             hover:shadow-xl hover:shadow-blue-500/50 "
        >
          <Send size={20} className="text-white" />
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
