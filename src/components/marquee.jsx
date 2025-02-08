/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Amit Sharma",
    username: "@amit",
    body: "This job portal has truly simplified my job search. I found my dream job in just a few days!",
    img: "https://avatar.vercel.sh/amit",
  },
  {
    name: "Priya Verma",
    username: "@priya",
    body: "The AI-powered recommendations helped me discover job opportunities I wouldn’t have found otherwise.",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Rajesh Kumar",
    username: "@rajesh",
    body: "The resume builder and interview tips were super helpful. I landed my first job as a software engineer!",
    img: "https://avatar.vercel.sh/rajesh",
  },
  {
    name: "Anjali Singh",
    username: "@anjali",
    body: "The job alerts are a lifesaver! I get notified about relevant jobs instantly.",
    img: "https://avatar.vercel.sh/anjali",
  },
  {
    name: "Vikram Das",
    username: "@vikram",
    body: "The company reviews section gave me great insights before applying. Highly recommend this portal!",
    img: "https://avatar.vercel.sh/vikram",
  },
  {
    name: "Sanya Kapoor",
    username: "@sanya",
    body: "Easy-to-use interface and powerful job filters make this the best job portal out there.",
    img: "https://avatar.vercel.sh/sanya",
  },
];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-40 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col justify-between",
        "border-gray-200 backdrop-blur-lg bg-white/30 shadow-lg", // Light theme
        "dark:border-gray-700 dark:backdrop-blur-lg dark:bg-white/10 dark:shadow-gray-800" // Dark theme
      )}
    >
      {/* User Info */}
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>

      {/* Review Text (Limited Lines) */}
      <blockquote className="mt-2 text-sm line-clamp-3">{body}</blockquote>
    </figure>
  );
};

const MarqueeDemo = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeDemo;
