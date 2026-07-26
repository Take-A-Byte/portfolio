"use client";

import { useMalaChain } from "@/hooks/useMalaChain";

type BeadSpec = { type: "flower"; size: number } | { type: "leaf" };

function FlowerVisual({ size }: { size: number }) {
  const petal = Math.round(size * 0.58);
  const petalOffset = (size - petal) / 2;
  const center = Math.round(size * 0.34);
  const centerOffset = (size - center) / 2;
  const petalPositions = [
    { top: -petal * 0.32, left: petalOffset },
    { top: size - petal + petal * 0.32, left: petalOffset },
    { top: petalOffset, left: -petal * 0.32 },
    { top: petalOffset, left: size - petal + petal * 0.32 },
  ];

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {petalPositions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            width: petal,
            height: petal,
            borderRadius: "9999px",
            background: "#f8f1e3",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: centerOffset,
          left: centerOffset,
          width: center,
          height: center,
          borderRadius: "9999px",
          background: "#fde68a",
        }}
      />
    </div>
  );
}

function LeafVisual() {
  return (
    <div
      className="h-1 w-[8px]"
      style={{ background: "#3f6b3a", borderRadius: "0% 60% 0% 60%" }}
    />
  );
}

function BeadVisual({ spec }: { spec: BeadSpec }) {
  switch (spec.type) {
    case "flower":
      return <FlowerVisual size={spec.size} />;
    case "leaf":
      return <LeafVisual />;
  }
}

const JASMINE_PATTERN: BeadSpec[] = [
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "leaf" },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "leaf" },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "leaf" },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "flower", size: 5 },
  { type: "leaf" },
  { type: "leaf" },
];

function MalaLink({
  pattern,
  index,
  getRef,
}: {
  pattern: BeadSpec[];
  index: number;
  getRef: (index: number) => (el: HTMLDivElement | null) => void;
}) {
  if (index >= pattern.length) return null;

  return (
    <div
      ref={getRef(index)}
      className="flex flex-col items-center"
      style={{
        transformOrigin: "10% 0%",
        willChange: "transform",
        marginTop: index === 0 ? 0 : -1,
      }}
    >
      <BeadVisual spec={pattern[index]} />
      <MalaLink pattern={pattern} index={index + 1} getRef={getRef} />
    </div>
  );
}

export function JasmineMala({
  tiltX,
  className,
  driveGain = 10,
  transferGain = 0.2,
  stiffness = 70,
  damping = 5,
}: {
  tiltX: number;
  className?: string;
  driveGain?: number;
  transferGain?: number;
  stiffness?: number;
  damping?: number;
}) {
  const { getRef } = useMalaChain(tiltX, JASMINE_PATTERN.length, {
    driveGain,
    transferGain,
    stiffness,
    damping,
  });

  return (
    <div className={className}>
      <MalaLink pattern={JASMINE_PATTERN} index={0} getRef={getRef} />
    </div>
  );
}
