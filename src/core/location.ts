import { getConfig } from "./config";

/** Search params as a store, so the panel follows navigation from any router (or none). */

const EVENT = "dsgn-tweaks:location";
let patched = false;

/** Client-side routers move through history.pushState/replaceState without a popstate: announce those too. */
function patchHistory() {
  if (patched) return;
  patched = true;
  for (const method of ["pushState", "replaceState"] as const) {
    const original = history[method];
    history[method] = function (this: History, ...args: Parameters<History["pushState"]>) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(EVENT));
      return result;
    };
  }
}

export function subscribeLocation(listener: () => void) {
  patchHistory();
  window.addEventListener("popstate", listener);
  window.addEventListener(EVENT, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(EVENT, listener);
  };
}

export const getSearch = () => window.location.search;

/** Opens a URL with the host's router when it gave one, else with a normal page load. */
export function navigate(url: string) {
  const viaRouter = getConfig().navigate;
  if (viaRouter) viaRouter(url);
  else window.location.assign(url);
}
