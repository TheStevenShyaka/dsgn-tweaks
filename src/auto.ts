import { init, type DesignTweaksConfig } from "./index";

/**
 * Script-tag build: <script src=".../dsgn-tweaks.global.js"></script> mounts the panel by itself.
 * Configure it with window.dsgnTweaks = { ... } before the script, or with data attributes on the
 * script tag: data-endpoint, data-storage, data-agent, data-theme-attribute, data-theme-storage-key.
 */
declare global {
  interface Window {
    dsgnTweaks?: DesignTweaksConfig;
  }
}

const script = document.currentScript as HTMLScriptElement | null;
const data = script?.dataset ?? {};
const config: DesignTweaksConfig = {
  ...(data.endpoint ? { endpoint: data.endpoint } : {}),
  ...(data.storage ? { storage: data.storage as DesignTweaksConfig["storage"] } : {}),
  ...(data.agent ? { agentName: data.agent } : {}),
  ...(data.themeAttribute || data.themeStorageKey
    ? { theme: { attribute: data.themeAttribute, storageKey: data.themeStorageKey } }
    : {}),
  ...window.dsgnTweaks,
};

const start = () => init(config);
if (document.body) start();
else document.addEventListener("DOMContentLoaded", start, { once: true });

export { init };
