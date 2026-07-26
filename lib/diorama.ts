import type { CSSProperties } from "react";

/**
 * Layers are rigidly stacked along one shared card (translateZ only — the
 * shared stage rotation gives real CSS 3D parallax for free). The sun is
 * fixed in world space, so as the card rotates the light hits each elevated
 * layer's local plane from a different apparent angle. For the small tilt
 * angles this stage uses, that angle change is ~linear in tiltX/tiltY, so
 * the light vector felt by every layer is this fixed baseline plus a term
 * proportional to tilt — not the pointer position itself.
 */
const SUN_DIRECTION = { x: 0.4, y: 0.55 };
const TILT_LIGHT_INFLUENCE = 0.9;
const SHADOW_STRENGTH = 0.32;

export function getLayerStyle(depth: number, tiltX: number, tiltY: number): CSSProperties {
  const lightX = SUN_DIRECTION.x + tiltX * TILT_LIGHT_INFLUENCE;
  const lightY = SUN_DIRECTION.y + tiltY * TILT_LIGHT_INFLUENCE;
  const shadowX = lightX * depth * SHADOW_STRENGTH;
  const shadowY = lightY * depth * SHADOW_STRENGTH;
  const blur = 4 + depth * 0.09;

  return {
    transform: `translateZ(${depth}px)`,
    filter: `drop-shadow(${shadowX}px ${shadowY}px ${blur}px rgba(12,8,24,0.7))`,
  };
}
