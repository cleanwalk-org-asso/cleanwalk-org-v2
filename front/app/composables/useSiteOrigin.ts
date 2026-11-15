export function useSiteOrigin() {
  return useRequestURL({ xForwardedHost: true, xForwardedProto: true }).origin
}
