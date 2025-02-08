import MarqueeDemo from "@/components/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
// import { TextAnimate } from "@/components/magicui/text-animate";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-screen-xl mx-auto">
      {/* HERO TEXTS */}
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Discover Your Next Career Move
          <span className="flex items-center gap-2 sm:gap-6">
            with
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                className="h-14 sm:h-24 lg:h-32"
                alt="Job Portal Logo"
              />
              <span className="text-white font-bold text-4xl sm:text-6xl lg:text-8xl">
                Job<span className="text-blue-500">X.</span>
              </span>
            </div>
          </span>
        </h1>

        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Browse top job opportunities or connect with top talent effortlessly.
        </p>
      </section>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button
            variant="blue"
            size="xl"
            className="bg-gradient-to-r from-sky-600 to-blue-700 text-white 
               shadow-md shadow-sky-400/20 
               hover:shadow-lg hover:shadow-sky-500/90 
               hover:from-sky-500 hover:to-blue-600
               transition duration-300 ease-in-out w-full sm:w-auto"
          >
            Find Jobs
          </Button>
        </Link>

        <Link to={"/post-job"}>
          <Button
            variant="destructive"
            size="xl"
            className="bg-gradient-to-r from-red-600 to-rose-700 text-white 
               shadow-md shadow-red-500/20 
               hover:shadow-lg hover:shadow-red-600/80 
               hover:from-red-500 hover:to-rose-600
               transition duration-300 ease-in-out w-full sm:w-auto"
          >
            Post a Job
          </Button>
        </Link>
      </div>

      {/* CAROUSEL */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            loop: true,
          }),
        ]}
        className="w-full py-10"
        loop
      >
        <CarouselContent className="flex gap-5 sm:gap-10 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/6"
            >
              <img
                src={path}
                alt={name}
                className="h-8 sm:h-12 lg:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* BANNER */}
      <img src="/banner.jpeg" className="w-full rounded-lg shadow-lg" />

      {/* CARDS SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Job Seekers Card */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a1f44] to-[#1e3a8a] text-white shadow-xl transition-transform duration-300 hover:shadow-blue-600/50">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-3 text-blue-300">
              <svg
                className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 6V3m0 3a6 6 0 016 6v3a6 6 0 01-6 6 6 6 0 01-6-6v-3a6 6 0 016-6z"></path>
              </svg>
              For Job Seekers
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm sm:text-base lg:text-lg text-gray-300">
            Find your dream job, track applications, and connect with top
            employers.
          </CardContent>
        </Card>

        {/* Employers Card */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3b0826] to-[#6b2137] text-white shadow-xl transition-transform duration-300 hover:shadow-red-500/50">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-3 text-rose-400">
              <svg
                className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-rose-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 8h14M5 12h14M5 16h14"></path>
              </svg>
              For Employers
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm sm:text-base lg:text-lg text-gray-300">
            Post job openings, manage applicants, and hire top talent
            effortlessly.
          </CardContent>
        </Card>
      </section>

      {/* FAQ's */}
      <Accordion type="multiple" className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="group border border-gray-700 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#334155] 
                 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 
                 backdrop-blur-lg overflow-hidden"
          >
            <AccordionTrigger
              className="flex justify-between items-center w-full px-5 py-4 
                                   text-base sm:text-lg lg:text-xl font-semibold text-white 
                                   transition-all duration-300 group-hover:text-blue-400"
            >
              {faq.question}
            </AccordionTrigger>

            <AccordionContent
              className="px-5 py-3 text-gray-300 text-sm sm:text-base lg:text-lg 
                                   bg-white/10 backdrop-blur-xl rounded-b-xl 
                                   transition-all duration-500 ease-in-out leading-relaxed"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* MARQUEE */}
      <MarqueeDemo />
    </main>
  );
};

export default LandingPage;
