import type { ComponentSize } from "./contracts";

const SIZE_TO_PX: Record<ComponentSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

/**
 * Maps design-system control density to a pixel size for Lucide (or similar) icons.
 */
export function iconSizeFromComponentSize(size: ComponentSize): number {
  return SIZE_TO_PX[size];
}
