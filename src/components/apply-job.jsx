/* eslint-disable react/prop-types */
import { applyToJob } from "@/api/apiApplication";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Ban,
  Briefcase,
  CheckCircle,
  Send,
  Upload,
  X,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import * as z from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className={`w-full mb-8 flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300
    ${
      job?.isOpen
        ? applied
          ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-red-500/50 hover:brightness-110"
          : "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white shadow-md hover:shadow-blue-400/50 hover:brightness-110"
        : "bg-gray-700 text-gray-400 cursor-not-allowed"
    }`}
          disabled={!job?.isOpen}
        >
          {job?.isOpen ? (
            applied ? (
              <>
                <CheckCircle className="w-5 h-5" /> Applied
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Apply
              </>
            )
          ) : (
            <>
              <Ban className="w-5 h-5" /> Hiring Closed
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900 text-white rounded-lg shadow-xl border border-gray-800">
        {/* Drawer Header */}
        <DrawerHeader className="text-white px-6 py-4 rounded-t-lg shadow-md">
          <DrawerTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-white" />
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription className="text-gray-300 mt-1">
            Please fill out the form below to proceed with your application.
          </DrawerDescription>
        </DrawerHeader>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          {/* Years of Experience */}
          <div>
            <Label className="text-gray-400 font-medium">
              Years of Experience
            </Label>
            <Input
              type="number"
              placeholder="Enter your experience"
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white placeholder-gray-500 
             focus:ring-blue-500 focus:border-blue-500 transition-all 
             hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
              {...register("experience", { valueAsNumber: true })}
            />

            {errors.experience && (
              <p className="text-red-400 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <Label className="text-gray-400 font-medium">Skills</Label>
            <Input
              type="text"
              placeholder="e.g., React, Node.js, Python"
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white placeholder-gray-500 
               focus:ring-blue-500 focus:border-blue-500 transition-all 
               hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-400 text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Education Level */}
          <div>
            <Label className="text-gray-400 font-medium">Education Level</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  {...field}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="text-gray-300">
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate" className="text-gray-300">
                      Graduate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate" className="text-gray-300">
                      Post Graduate
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-400 text-sm mt-1">
                {errors.education.message}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-400 font-medium flex items-center gap-2">
              Upload Resume
            </Label>

            <div className="relative w-full flex items-center gap-3">
              {/* Upload Icon beside Browse Button */}
              <Upload size={20} className="text-blue-400" />

              <Input
                type="file"
                accept=".pdf, .doc, .docx"
                className="file:bg-gradient-to-r file:from-blue-500 file:to-blue-600 
             file:text-white file:px-4 file:py-2 file:rounded-md 
             file:border-none file:cursor-pointer 
             file:transition-all file:duration-300 file:ease-in-out 
             file:hover:from-blue-600 file:hover:to-blue-700 
             file:focus:ring-2 file:focus:ring-blue-500 file:focus:shadow-lg 
             file:hover:shadow-blue-500/50 
             h-full py-2 pr-12"
                {...register("resume")}
              />
            </div>

            {errors.resume && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                {errors.resume.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorApply?.message && (
            <p className="text-red-400 text-sm mt-2">{errorApply?.message}</p>
          )}

          {/* Loader */}
          {loadingApply && (
            <BarLoader width={"100%"} color="#3b82f6" className="mt-2" />
          )}

          {/* Apply Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 font-semibold rounded-lg shadow-md transition-all 
             hover:shadow-blue-500/50 hover:shadow-lg"
          >
            <Send className="w-5 h-5 mr-2" />
            Apply
          </Button>
        </form>

        {/* Drawer Footer */}
        <DrawerFooter className="p-4 border-t border-gray-700 mt-4  rounded-b-lg">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 font-semibold rounded-lg shadow-md transition-all 
             hover:shadow-red-500/50 hover:shadow-lg"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
