"use client";

import { useState, useEffect } from "react";

export function useMobile(breakpoint = 912) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Listen for resizing

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
