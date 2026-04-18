let gsapPromise: Promise<typeof import("gsap").default> | null = null;

/** Lazy-load GSAP so the main bundle stays smaller until animation runs. */
export function loadGsap(): Promise<typeof import("gsap").default> {
  if (!gsapPromise) {
    gsapPromise = import("gsap").then((m) => m.default);
  }
  return gsapPromise;
}
