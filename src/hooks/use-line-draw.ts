"use client";

import { useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useLineDraw(margin: string = "-50px") {
  const inViewRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: margin as `${number}px` });
  const [pathLength, setPathLength] = useState(1000);

  // Callback ref measures SVG paths on mount and sets pathLength
  const ref = useCallback(
    (node: SVGSVGElement | null) => {
      // Keep the inViewRef in sync for useInView
      (inViewRef as React.MutableRefObject<SVGSVGElement | null>).current = node;
      if (!node) return;
      const paths = node.querySelectorAll("path, line, circle, polyline");
      let maxLength = 0;
      paths.forEach((el) => {
        if ("getTotalLength" in el) {
          const len = (el as SVGGeometryElement).getTotalLength();
          if (len > maxLength) maxLength = len;
        }
      });
      if (maxLength > 0) setPathLength(maxLength);
    },
    [],
  );

  return { ref, isInView, pathLength };
}
