"use client";

import { useEffect, useRef } from "react";
import { FlowerLoader } from "@/lib/flowerLoader";

export function TempleLoader() {
  const flowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flowerRef.current) return;
    const loader = new FlowerLoader(flowerRef.current);
    return () => loader.destroy();
  }, []);

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div
        className="flex max-w-full flex-1 items-center justify-center rounded-3xl bg-[#5d8131]"
        style={
          {
            aspectRatio: "941 / 1672",
            "--flower-center": "#e5bc36",
            "--flower-petal": "#f6ddd0",
            "--flower-petal-border": "#c94259",
          } as React.CSSProperties
        }
      >
        <div className="flower" ref={flowerRef}>
          <div className="flower__center" />
          <div className="flower__leaves" />
        </div>
      </div>
    </div>
  );
}
