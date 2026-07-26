import Image from "next/image";
import { SWEEP_MS, type CloudDirection } from "@/hooks/usePanelSwipe";

const IMAGE_ASPECT = 373 / 206; // text-cloud.png width/height

// Several offset/scaled copies of the same watercolor cloud, layered into
// one puffier, more opaque cluster (rather than a hard rectangle) so the
// text underneath is reliably hidden at the swap instant.
//
// dx/dy/width are all in px, relative to the cluster's own center — plain
// pixels instead of percentages, because percentages here would be
// relative to whatever ancestor happens to define the containing block,
// which made the cluster's actual on-screen size impossible to reason
// about. z is stacking order — higher sits in front and casts its own
// shadow onto the layers behind it, giving the cluster real depth instead
// of one flat silhouette. speed multiplies the base sweep duration (>1 =
// slower, <1 = faster) so puffs don't all move as one rigid block — kept
// within roughly 0.85-1.15 so every layer is still near its own peak
// opacity around the shared text-swap instant at the animation's midpoint,
// just arriving/leaving at slightly different times.
// In `debug` mode (see TextCloud below), array position N always renders
// with DEBUG_COLORS[N] and a "N · zZ" label in that same color — so e.g. a
// rose-bordered box labeled "0 · z10" on screen is CLOUD_LAYERS[0] here.
// The comment on each entry is that same color name, for quick lookup
// without cross-referencing DEBUG_COLORS.
const CLOUD_LAYERS = [
  // upper group, toward the bells
  { dx: -76, dy: -197, width: 234, opacity: 1, z: 10, speed: 1.0 }, // 0 · rose
  { dx: 87, dy: -170, width: 309, opacity: 1, z: 9, speed: 1.1 }, // 1 · blue
  { dx: -109, dy: -120, width: 301, opacity: 1, z: 11, speed: 0.9 }, // 2 · green
  // gap here before the text-level group
  { dx: 0, dy: -129, width: 307, opacity: 1, z: 6, speed: 1.05 }, // 3 · amber
  { dx: 79, dy: -80, width: 311, opacity: 1, z: 5, speed: 0.95 }, // 4 · purple
  { dx: -50, dy: -58, width: 326, opacity: 1, z: 7, speed: 1.15 }, // 5 · cyan
  { dx: 58, dy: 10, width: 318, opacity: 1, z: 4, speed: 0.85 }, // 6 · pink
  { dx: -55, dy: 96, width: 326, opacity: 1, z: 8, speed: 1.0 }, // 7 · lime
  // gap here before the lower group
  { dx: 86, dy: 133, width: 339, opacity: 1, z: 3, speed: 1.1 }, // 8 · orange
  { dx: -58, dy: 197, width: 309, opacity: 1, z: 2, speed: 0.9 }, // 9 · indigo
  { dx: 83, dy: 264, width: 326, opacity: 1, z: 1, speed: 1.05 }, // 10 · teal
  { dx: 109, dy: 293, width: 92, opacity: 1, z: 12, speed: 0.95 }, // 11 · yellow
];

// One distinct color per layer, cycled if there are more layers than
// colors — used only in `debug` mode to tell overlapping puffs apart.
// Index here must line up with the "N · color" comments on CLOUD_LAYERS
// above — if you reorder one, reorder its comment too.
const DEBUG_COLORS = [
  "#e11d48", // 0 rose
  "#2563eb", // 1 blue
  "#16a34a", // 2 green
  "#f59e0b", // 3 amber
  "#9333ea", // 4 purple
  "#0891b2", // 5 cyan
  "#db2777", // 6 pink
  "#65a30d", // 7 lime
  "#ea580c", // 8 orange
  "#4f46e5", // 9 indigo
  "#0d9488", // 10 teal
  "#ca8a04", // 11 yellow
];

function layerBox(layer: { dx: number; dy: number; width: number }) {
  const height = layer.width / IMAGE_ASPECT;
  return {
    left: layer.dx - layer.width / 2,
    right: layer.dx + layer.width / 2,
    top: layer.dy - height / 2,
    bottom: layer.dy + height / 2,
    height,
  };
}

// The cluster's own bounding box — the container is derived FROM the
// layers, so it always exactly fits them, however they're tuned. It can
// never be smaller than the cloud, by construction, not by hand-tuned
// padding. The only remaining boundary is the invite card's own edge,
// which is fixed (it's the whole invite's frame) — if the cluster still
// clips there, it's genuinely too big for the card, not under-contained.
const CLUSTER_BOXES = CLOUD_LAYERS.map(layerBox);
const CLUSTER_MIN_LEFT = Math.min(...CLUSTER_BOXES.map((b) => b.left));
const CLUSTER_MAX_RIGHT = Math.max(...CLUSTER_BOXES.map((b) => b.right));
const CLUSTER_MIN_TOP = Math.min(...CLUSTER_BOXES.map((b) => b.top));
const CLUSTER_MAX_BOTTOM = Math.max(...CLUSTER_BOXES.map((b) => b.bottom));
const CLUSTER_WIDTH = CLUSTER_MAX_RIGHT - CLUSTER_MIN_LEFT;
const CLUSTER_HEIGHT = CLUSTER_MAX_BOTTOM - CLUSTER_MIN_TOP;

// Sized relative to its own (small, text-block) parent rather than the
// viewport — this only ever covers the text, never the rest of the scene.
// `preview` pins it in place (no sweep animation) so its position can be
// tuned without triggering a swipe every time — flip off once done.
// `debug` outlines each layer in its own color plus its array index, so
// overlapping puffs can be told apart and reordered — flip off once done.
//
// Stays mounted (opacity: 0) at rest instead of returning null: unmounting
// meant every swipe had to freshly create, fetch, and decode 12 <Image>
// elements before anything could appear on screen, which read as the cloud
// "reacting late" to a swipe. Staying mounted lets the browser fetch/decode
// once up front, so a swipe only has to animate opacity/transform on
// already-ready images.
export function TextCloud({
  direction,
  preview = false,
  debug = false,
}: {
  direction: CloudDirection;
  preview?: boolean;
  debug?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Anchor: always centered on the text block — the sweep motion now
         lives on each layer below (so they can move at different paces),
         not here. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Cluster: sized to exactly the union of all layers below. The
           anchor's own -translate-x/y-1/2 (matching this div's declared
           size) is what centers it — no extra offset needed here, since
           each layer below is already placed in 0..width/height local
           coordinates via `box.left/top - CLUSTER_MIN_LEFT/TOP`. */}
        <div
          className="relative"
          style={{
            width: CLUSTER_WIDTH,
            height: CLUSTER_HEIGHT,
          }}
        >
          {CLOUD_LAYERS.map((layer, index) => {
            const box = CLUSTER_BOXES[index];
            const debugColor = DEBUG_COLORS[index % DEBUG_COLORS.length];
            return (
              <div
                key={index}
                className="absolute"
                style={
                  {
                    left: box.left - CLUSTER_MIN_LEFT,
                    top: box.top - CLUSTER_MIN_TOP,
                    width: layer.width,
                    height: box.height,
                    zIndex: layer.z,
                    opacity: direction ? undefined : preview ? layer.opacity : 0,
                    "--layer-opacity": layer.opacity,
                    filter: debug ? undefined : "drop-shadow(0 6px 8px rgba(60, 40, 20, 0.25))",
                    border: debug ? `2px solid ${debugColor}` : undefined,
                    boxSizing: "border-box",
                    // ease-out (not ease-in-out): the swipe should read as an
                    // immediate reaction — fast movement/fade-in right away,
                    // easing off only as it settles into place — rather than
                    // ease-in-out's slow ramp-up that reads as input lag.
                    animation: direction
                      ? `${
                          direction === "enter-right" ? "cloud-enter-right" : "cloud-enter-left"
                        } ${Math.round(SWEEP_MS * layer.speed)}ms ease-out forwards`
                      : undefined,
                  } as React.CSSProperties
                }
              >
                <Image
                  src="/wedding-temple/text-cloud.png"
                  alt=""
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="200px"
                />
                {debug && (
                  <span
                    className="absolute left-0 top-0 px-1 text-xs font-bold leading-tight text-white"
                    style={{ background: debugColor }}
                  >
                    {index} · z{layer.z}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
