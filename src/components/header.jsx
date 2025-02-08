/* eslint-disable no-unused-vars */
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, LogInIcon, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShimmerButton } from "./magicui/shimmer-button";
import { Button } from "./ui/button";


const Header = () => {
  const { user } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="h-10 w-auto ml-4" alt="JobX Logo" />
          <span className="text-3xl font-bold tracking-wide">
            Job<span className="text-blue-500">X.</span>
          </span>
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            {/* <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button> */}
            <ShimmerButton
              className="shadow-2xl"
              onClick={() => setShowSignIn(true)}
            >
              <span className="flex items-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <LogInIcon className="w-5 h-5" />
                Login
              </span>
            </ShimmerButton>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="bg-gradient-to-r from-red-700 to-rose-800 text-white 
               shadow-md shadow-red-500/20 
               hover:shadow-lg hover:shadow-red-700/80 
               hover:from-red-700 hover:to-rose-800
               transition duration-300 ease-in-out"
                >
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
