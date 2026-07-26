"use client";

import Image from "next/image";
import { useTilt } from "@/hooks/useTilt";
import { usePendulum } from "@/hooks/usePendulum";
import { usePanelSwipe } from "@/hooks/usePanelSwipe";
import { useDemoTilt } from "@/hooks/useDemoTilt";
import { getLayerStyle } from "@/lib/diorama";
import { JasmineMala } from "@/components/wedding-temple/JasmineMala";
import { TextCloud } from "@/components/wedding-temple/TextCloud";

const STAGE_MAX_ROTATE = 14;

// Content and typography ported from the family's printed invitation
// (Cormorant Garamond for the eyebrow line, names, and venue text; Nunito
// for the day-of-week/month labels and the time; Playfair Display for the
// large date number) — see the annotated invitation photos this was
// transcribed from. Only the overview slide carries the couple's names;
// the ceremony/reception slides are pure event-detail slides, matching the
// source poster.
const TEXT_SETS = [
  {
    kind: "overview" as const,
    eyebrow:
      "We cordially invites your esteemed presence and prayer with friends & family on the auspicious occasion of our wedding",
  },
  {
    kind: "event" as const,
    day: "SUNDAY",
    date: "06",
    month: "SEPTEMBER",
    subLabel: "Muhurtham",
    // Non-breaking spaces before "am"/"pm" so a wrap can only happen after
    // "to", never splitting a time from its am/pm designator.
    time: "11.40 am to 12.00 pm",
    venue: ["Kodakkad Bank Auditorium", "Kannadipara, Charvathur", "Kasargode."],
  },
  {
    kind: "event" as const,
    title: "Reception",
    day: "WEDNESDAY",
    date: "09",
    month: "SEPTEMBER",
    subLabel: "Time",
    time: "5:00 pm to 8:00 pm",
    venue: ["Sri Mulam", "Vazhuthacaud", "Thiruvananthapuram"],
  },
];

// The one place to place every layer: top/bottom/left/right are percent
// nudges toward that edge (e.g. { left: 2, bottom: 2 } shifts 2% toward the
// bottom-left), scale is a size multiplier. origin sets where that scale
// pivots from — for a full-frame layer, "50% 50%" (center) is right, but
// for a corner decoration whose artwork only lives in one corner of its
// canvas, scale MUST pivot from that same corner, or growing it pushes the
// artwork out past the opposite edges instead of enlarging it in place.
// A scale slightly above 1 doubles as anti-clip bleed — the extra size sits
// clipped behind the card's overflow-hidden at rest (identical to scale=1)
// and only gets revealed, instead of a blank gap, once tilt shifts the
// layer. Deeper (more foreground) layers move more under the stage's
// perspective rotation, so they need more bleed.
const LAYOUT: Record<
  string,
  {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    scale?: number;
    origin?: string;
    /** Atmospheric blur in px — the knob for how hazy/distant a layer reads. */
    blur?: number;
  }
> = {
  background: {scale: 1.2, origin: "50% 50%"},
  temple: { blur: 0.8 },
  mandapam: { scale: 1.04 },
  ledge: { scale: 1 },
  couple: { scale: 1.0, origin: "0% 100%" },
  cornerLotus: { left: 0, bottom: 0, scale: 1.4, origin: "0% 100%" },
  cornerDaisy: { scale: 1.14, origin: "110% 110%" },
  cornerBanana: { left:-5, scale: 1.14, origin: "120% 0%" },
  bellLong: { scale: 1.18, origin: "-40% 0%" },
  bellShort: { scale: 1.18, origin: "-40% -10%" },
};

function layoutTransform(name: keyof typeof LAYOUT) {
  const { top = 0, bottom = 0, left = 0, right = 0, scale = 1 } = LAYOUT[name] ?? {};
  const dx = right - left;
  const dy = bottom - top;
  return `translate(${dx}%, ${dy}%) scale(${scale})`;
}

function layoutOrigin(name: keyof typeof LAYOUT) {
  return LAYOUT[name]?.origin ?? "50% 50%";
}

function layoutBlur(name: keyof typeof LAYOUT) {
  return LAYOUT[name]?.blur ?? 0;
}

function Layer({
  src,
  depth,
  x,
  y,
  name,
  priority,
  shadow = true,
}: {
  src: string;
  depth: number;
  x: number;
  y: number;
  name: keyof typeof LAYOUT;
  priority?: boolean;
  /** The base sky/backdrop layer sits behind everything and casts nothing
   * onto anything else, so it gets no drop-shadow — matching how the other
   * scenes in this project skip the shadow on their bottom-most layer. */
  shadow?: boolean;
}) {
  const { transform, filter } = getLayerStyle(depth, x, y);
  const blur = layoutBlur(name);
  const layerFilter = [shadow ? filter : null, blur ? `blur(${blur}px)` : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none"
      style={{
        transform: `${transform} ${layoutTransform(name)}`,
        transformOrigin: layoutOrigin(name),
        filter: layerFilter || "none",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 768px) 100vw, 700px"
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}

// The small flourish-and-rule ornament from the printed invitation, used
// above/below the names and to bracket each date/time column. `flip` rotates
// it 180° for the closing divider of a bracket pair, so the flourish points
// back in toward the content it just closed instead of repeating the
// opening divider's orientation.
function Divider({ small = false, flip = false }: { small?: boolean; flip?: boolean }) {
  return (
    <Image
      src="/wedding-temple/divider.png"
      alt=""
      width={773}
      height={120}
      className={`h-auto object-contain opacity-80 ${flip ? "rotate-180" : ""}`}
      style={{ width: small ? "9cqw" : "clamp(90px, 17cqw, 130px)" }}
    />
  );
}

// useTilt reports the raw pointer/gyro reading, which can hit the full ±1
// range easily (e.g. dragging to a screen corner). Everything in this scene
// — layer overscan, bleed, mala swing range — was tuned against a smaller
// effective range, so clamp here rather than let extreme input drive the
// rotation past what the tuning actually covers.
const MAX_TILT = 0.5;

function clampTilt(value: number) {
  return Math.max(-MAX_TILT, Math.min(MAX_TILT, value));
}

export function TempleInviteScene() {
  const { x: rawX, y: rawY, needsPermission, permissionDenied, requestPermission } = useTilt();
  const {
    current: textIndex,
    cloud,
    onboardingDone,
    goTo: goToText,
    handlePointerDown,
    handlePointerUp,
  } = usePanelSwipe(TEXT_SETS.length);
  // A synthetic one-time tilt nudge once the swipe onboarding finishes, so
  // visitors who haven't touched anything yet still see the card respond
  // and understand it's tiltable — replaces an explicit instructional
  // caption with the invite demonstrating its own affordance.
  const demoTiltX = useDemoTilt(rawX, onboardingDone);
  const x = clampTilt(rawX + demoTiltX);
  const y = clampTilt(rawY);
  const bellLongRef = usePendulum(x, { stiffness: 35 });
  const bellShortRef = usePendulum(x, { stiffness: 65 });
  const text = TEXT_SETS[textIndex];

  const stageTransform = `rotateX(${-y * STAGE_MAX_ROTATE}deg) rotateY(${x * STAGE_MAX_ROTATE}deg)`;

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div
        className="relative max-w-full flex-1 touch-pan-y select-none overflow-hidden rounded-3xl"
        style={{ perspective: "1400px", aspectRatio: "941 / 1672", containerType: "size" }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: stageTransform,
            transition: "transform 60ms linear",
          }}
        >
          <Layer
            src="/wedding-temple/background.png"
            depth={0}
            x={x}
            y={y}
            name="background"
            priority
            shadow={false}
          />
          <Layer src="/wedding-temple/temple.png" depth={50} x={x} y={y} name="temple" shadow={false} />

          {/* Stacking, back to front: text, then cloud (covers the text
             during the swap), then mandapam (its pillar column sits in
             front of the cloud). This stage renders with real CSS 3D
             (translateZ via getLayerStyle, inside a perspective + preserve-3d
             parent) — so unlike a normal 2D page, paint order here is NOT
             decided by DOM/sibling order, it's decided by each layer's
             numeric depth. depth=70 (< mandapam's depth={90} below) is what
             actually keeps text/cloud behind mandapam; matching DOM order
             alone isn't enough, and a depth ≥ 90 here would silently put the
             cloud back in front of mandapam regardless of DOM position. text
             and cloud intentionally share one depth (kept perfectly
             co-planar) — at equal depth the renderer falls back to DOM
             order as the tiebreaker, which is what puts cloud in front of
             text. All three share the same top/bottom percentages —
             measured against the background art itself (mountains fade out
             ~25% down the card, the couple's heads start ~66% down) — so
             the text zone always lands on the plain parchment patch and
             never the mountains/temple/couple, on any device. Font sizes
             below are in cqw (percent of the CARD's own rendered width, via
             containerType: "size" on the card), not viewport breakpoints,
             so text scales with the card even when the card itself is
             height- rather than width-constrained. */}
          <div
            className="pointer-events-none absolute left-[6%] right-[26%] top-[25%] bottom-[34%]"
            style={{ transform: getLayerStyle(70, x, y).transform }}
          >
            <div className="relative flex h-full flex-col items-center justify-center gap-[1.6cqw] text-center">
              {text.kind === "overview" ? (
                <>
                  {/* max-width narrower than the shared box: the full
                     sentence wraps at the box's own width into a long
                     first two lines and a short leftover third line —
                     narrowing just this paragraph pushes a word or two
                     down each line, balancing all three. */}
                  <p
                    className="font-cormorant max-w-[56cqw] font-bold italic text-red-900/80"
                    style={{ fontSize: "clamp(10px, 3.6cqw, 15px)", lineHeight: 1.25 }}
                  >
                    {text.eyebrow}
                  </p>
                  <Divider />
                  <p
                    className="font-cormorant font-bold text-red-950"
                    style={{ fontSize: "clamp(20px, 7.6cqw, 34px)", lineHeight: 1.15 }}
                  >
                    Ananthajith A
                    <span
                      className="font-cormorant mx-[0.6cqw] block font-medium not-italic text-red-800"
                      style={{ fontSize: "clamp(12px, 4cqw, 18px)" }}
                    >
                      with
                    </span>
                    Architha M Riya
                  </p>
                  <Divider flip />
                </>
              ) : (
                <>
                  {text.title && (
                    <p
                      className="font-cormorant text-red-950"
                      style={{ fontSize: "clamp(18px, 6.2cqw, 26px)" }}
                    >
                      {text.title}
                    </p>
                  )}
                  {/* items-stretch + each column's own flex-1 middle group makes
                     both columns match the row's tallest height, so the
                     top/bottom dividers line up across columns even when one
                     column's text (e.g. a wrapped time range) is taller. */}
                  <div className="flex items-stretch justify-center gap-[4cqw]">
                    <div className="flex flex-col items-center">
                      <Divider small />
                      <div className="flex flex-1 flex-col items-center justify-center gap-[0.8cqw]">
                        <span
                          className="font-nunito font-bold tracking-wide text-red-900/70"
                          style={{ fontSize: "clamp(8px, 2.6cqw, 11px)" }}
                        >
                          {text.day}
                        </span>
                        <span
                          className="font-playfair font-bold leading-none text-red-950"
                          style={{ fontSize: "clamp(22px, 7.6cqw, 34px)" }}
                        >
                          {text.date}
                        </span>
                        <span
                          className="font-nunito font-bold tracking-wide text-red-900/70"
                          style={{ fontSize: "clamp(8px, 2.6cqw, 11px)" }}
                        >
                          {text.month}
                        </span>
                      </div>
                      <Divider small flip />
                    </div>
                    <div className="flex max-w-[26cqw] flex-col items-center">
                      <Divider small />
                      <div className="flex flex-1 flex-col items-center justify-center gap-[0.8cqw]">
                        <span
                          className="font-cormorant text-red-900/70"
                          style={{ fontSize: "clamp(10px, 3.6cqw, 15px)" }}
                        >
                          {text.subLabel}
                        </span>
                        <span
                          className="font-nunito font-bold text-red-950"
                          style={{ fontSize: "clamp(10px, 3.2cqw, 13px)" }}
                        >
                          {text.time}
                        </span>
                      </div>
                      <Divider small flip />
                    </div>
                  </div>
                  <Image
                    src="/wedding-temple/location-pin.png"
                    alt=""
                    width={267}
                    height={404}
                    className="mt-[0.4cqw] w-auto object-contain"
                    style={{ height: "clamp(12px, 3.4cqw, 18px)" }}
                  />
                  <div
                    className="font-cormorant leading-snug text-red-900/80"
                    style={{ fontSize: "clamp(10px, 3.2cqw, 13px)" }}
                  >
                    {text.venue.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </>
              )}

              <div className="pointer-events-auto mt-[0.4cqw] flex items-center justify-center gap-1.5">
                {TEXT_SETS.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show text ${index + 1}`}
                    onClick={() => goToText(index)}
                    className={`h-1.5 cursor-pointer rounded-full transition-all ${
                      index === textIndex
                        ? "w-4 bg-red-900/70 dark:bg-amber-100/80"
                        : "w-1.5 bg-red-900/25 dark:bg-amber-100/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-[6%] right-[26%] top-[25%] bottom-[34%]"
            style={{ transform: getLayerStyle(70, x, y).transform }}
          >
            <div className="relative h-full w-full">
              <TextCloud direction={cloud} />
            </div>
          </div>

          <Layer src="/wedding-temple/mandapam.png" depth={90} x={x} y={y} name="mandapam" />
          <Layer src="/wedding-temple/ledge.png" depth={110} x={x} y={y} name="ledge" />

          <Layer src="/wedding-temple/couple.png" depth={140} x={x} y={y} name="couple" />
          <Layer src="/wedding-temple/corner-lotus.png" depth={165} x={x} y={y} name="cornerLotus" />
          <Layer src="/wedding-temple/corner-daisy.png" depth={165} x={x} y={y} name="cornerDaisy" />
          <div className="absolute inset-0" style={{ transform: getLayerStyle(165, x, y).transform }}>
            <JasmineMala tiltX={x} className="absolute right-[7%] top-[5%]" stiffness={70} />
          </div>

          <Layer
            src="/wedding-temple/corner-banana.png"
            depth={165}
            x={x}
            y={y}
            name="cornerBanana"
            shadow={false}
          />

          <div className="absolute inset-0" style={{ transform: getLayerStyle(165, x, y).transform }}>
            <JasmineMala tiltX={x} className="absolute right-[10%] top-[6%]" stiffness={55} />
            <JasmineMala tiltX={x} className="absolute right-[4%] top-[7%]" stiffness={85} />
          </div>

          <div className="absolute inset-0" style={{ transform: getLayerStyle(210, x, y).transform }}>
            <div
              className="absolute inset-0"
              style={{ transform: layoutTransform("bellLong"), transformOrigin: layoutOrigin("bellLong") }}
            >
              <div
                ref={bellLongRef}
                className="pointer-events-none absolute inset-0 select-none"
                style={{ transformOrigin: "1.6% 0%" }}
              >
                <Image
                  src="/wedding-temple/bell-long.png"
                  alt=""
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              className="absolute inset-0"
              style={{ transform: layoutTransform("bellShort"), transformOrigin: layoutOrigin("bellShort") }}
            >
              <div
                ref={bellShortRef}
                className="pointer-events-none absolute inset-0 select-none"
                style={{ transformOrigin: "5.8% 0%" }}
              >
                <Image
                  src="/wedding-temple/bell-short.png"
                  alt=""
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {needsPermission && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
            <div className="flex max-w-xs flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-zinc-900">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Enable motion access to tilt the invite with your device&apos;s
                gyroscope.
              </p>
              <button
                type="button"
                onClick={requestPermission}
                className="rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white active:scale-95 dark:bg-white dark:text-zinc-950"
              >
                Enable motion
              </button>
              {permissionDenied && (
                <p className="text-xs text-red-500">
                  Permission denied — falling back to touch.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
