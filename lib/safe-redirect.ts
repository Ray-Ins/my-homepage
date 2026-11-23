/** Only allow same-origin relative paths to prevent open redirects. */
export function safeRedirect(target: string | null | undefined, fallback = "/portal") {
  if (!target || !target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) {
    return fallback;
  }
  return target;
}
