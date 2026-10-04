/**
 * Whether an image `src` is an absolute URL rather than a file under /public.
 *
 * University logos and photographs are pasted into the admin's Media tab as
 * links to wherever the image already lives (the university's own site, a
 * CDN, Cloudinary). `next/image` refuses any remote host not listed in
 * `images.remotePatterns`, and listing "every host" would turn the optimiser
 * into an open image proxy. So remote images skip the optimiser and load
 * straight from their host: pass this as `unoptimized`.
 */
export function isRemoteImage(src: string | undefined): boolean {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}
