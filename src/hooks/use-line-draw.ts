"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function useLineDraw(margin: string = "-50px") {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll("path, line, circle, polyline");
    let maxLength = 0;
    paths.forEach((el) => {
      if ("getTotalLength" in el) {
        const len = (el as SVGGeometryElement).getTotalLength();
        if (len > maxLength) maxLength = len;
      }
    });
    setPathLength(maxLength || 1000);
  }, []);

  return { ref, isInView, pathLength };
}
