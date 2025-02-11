"use client";
import JobAlert from "@/components/JobAlert/JobAlert";
import { useMobile } from "@/hooks/useMobile";

// async function getNavData() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav`, {
//     cache: "no-store",
//   });
//   return res.json();
// }

export default function Home() {
  const isMobile = useMobile();
  return (
    <div
      style={{ width: isMobile ? "100%" : "calc(100vw - 20rem)" }}
      className="flex items-start justify-center px-2 min-h-screen fixed top-28 lg:px-5 lg:left-80 bg-wheat"
    >
      <JobAlert />
    </div>
  );
}
