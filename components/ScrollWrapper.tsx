"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
}

export function ScrollWrapper({ children }: ScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(false);
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;

      const onMouseMove = (e: MouseEvent) => {
        const x = e.pageX - el.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > 3) setIsDragging(true);
        el.scrollLeft = scrollLeft.current - walk;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onTouchStart = (e: TouchEvent) => {
      setIsDragging(false);
      startX.current = e.touches[0].pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = x - startX.current;
      if (Math.abs(walk) > 3) setIsDragging(true);
      el.scrollLeft = scrollLeft.current - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-row-reverse gap-1 items-center p-0 cursor-grab select-none overflow-x-auto scrollbar-hide"
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return (
          <div
            onClick={(e) => {
              // Inactivate opening drop down menu or modal if we ar dragging
              if (isDragging) e.preventDefault();
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
