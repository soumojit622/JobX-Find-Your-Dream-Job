/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Building2, PlusCircle, Upload, X } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
             text-white bg-gradient-to-r from-blue-500 to-blue-700 
             rounded-lg shadow-md transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:shadow-blue-500/60"
        >
          <Building2 size={16} /> {/* Lucide Icon for company */}
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-gray-900 text-white rounded-lg shadow-lg">
        <DrawerHeader className="border-b border-gray-700 pb-3">
          <DrawerTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 size={22} className="text-blue-400" />
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>

        <form className="flex flex-col gap-4 p-6">
          {/* Company Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Company Name</label>
            <Input
              placeholder="Enter company name"
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white placeholder-gray-500 
               focus:ring-blue-500 focus:border-blue-500 transition-all 
               hover:border-blue-400 hover:shadow-blue-500/20 hover:shadow-md"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Company Logo */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Company Logo</label>
            <div
              className="relative flex items-center bg-gray-800 border border-gray-700 
                rounded-lg px-4 py-2 shadow-md shadow-gray-900/40 
                transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Upload size={20} className="text-blue-400 mr-3" />

              <Input
                type="file"
                accept="image/*"
                className="file:bg-gradient-to-r file:from-blue-500 file:to-blue-600 
             file:text-white file:px-4 file:py-2 file:rounded-md 
             file:border-none file:cursor-pointer 
             file:transition-all file:duration-300 file:ease-in-out 
             file:hover:from-blue-600 file:hover:to-blue-700 
             file:focus:ring-2 file:focus:ring-blue-500 file:focus:shadow-lg 
             file:hover:shadow-blue-500/50 
             h-full py-2"
                {...register("logo")}
              />
            </div>

            {errors.logo && (
              <p className="text-red-500 text-sm">{errors.logo.message}</p>
            )}
          </div>

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 font-semibold rounded-lg shadow-md transition-all 
             hover:shadow-blue-500/50 hover:shadow-lg"
          >
            <PlusCircle size={20} className="mr-1" />
            Add Company
          </Button>
        </form>

        {/* Footer */}
        <DrawerFooter className="border-t border-gray-700 mt-4 py-3 flex justify-between">
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#0a95fb" />}

          <DrawerClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 font-semibold rounded-lg shadow-md transition-all 
             hover:shadow-red-500/50 hover:shadow-lg"
            >
              <X size={16} />
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
