import type { SVGAttributes } from "react";

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        {...props}
      >
        <circle
          cx="20"
          cy="20"
          r="20"
          fill="#030712"
          className="dark:fill-[#FFFFFF]"
        />
        <path
          d="M13 27V13h13v3h-9.5v2.8H25v3h-8.5V27H13z"
          fill="white"
          className="dark:fill-[#030712]"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Falcon Apps
      </span>
    </div>
  );
};

export default Logo;
