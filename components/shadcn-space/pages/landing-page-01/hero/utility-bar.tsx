"use client";
import { Button } from "@/components/ui/button";

const InstagramIcon = ({ size }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip-instagram)">
      <path
        d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip-instagram">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const LinkedinIcon = ({ size }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10.667 5.333a4 4 0 0 1 4 4V14H12V9.333a1.333 1.333 0 1 0-2.667 0V14H6.667V9.333a4 4 0 0 1 4-4M4 6H1.333v8H4zM2.667 4a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667"
      stroke="currentColor"
      strokeWidth=".833"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DribbbleIcon = ({ size }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip-dribbble)">
      <path
        d="M15.942 4.242C12.683 7.617 8.333 8.7 1.874 9.117m16.25 1.583c-5.517-1.175-10.117.833-13.65 5.267M7.133 2.292c3.642 5 5 7.85 6.667 14.766M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip-dribbble">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const UtilityBar = () => {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 flex flex-col gap-8">
        <div className="border-x border-border px-4 md:px-10 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-5">
          <p className="text-base font-normal text-foreground">
            Research, Design & Deliver
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {[DribbbleIcon, InstagramIcon, LinkedinIcon].map(
                (Icon, index) => {
                  return (
                    <a
                      href="#"
                      key={index}
                      className="w-fit p-2 sm:p-2.5 border border-border rounded-full hover:bg-muted inline-flex items-center justify-center"
                    >
                      <Icon size={16} />
                    </a>
                  );
                },
              )}
            </div>
            <Button
              variant={"outline"}
              className="h-auto px-4 py-2 rounded-full cursor-pointer"
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UtilityBar;
