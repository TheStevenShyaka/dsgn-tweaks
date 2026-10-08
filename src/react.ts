import { useEffect } from "react";
import { init, type DesignTweaksConfig } from "dsgn-tweaks";

/**
 * React component for any React app (Vite, Remix, React Router, Gatsby…). Renders nothing; mounts
 * the panel once. Render it in development only. In Next.js use dsgn-tweaks/next instead.
 */
export function DsgnTweaks({ config }: { config?: DesignTweaksConfig }) {
  useEffect(() => {
    const panel = init(config);
    return () => panel.destroy();
    // Mounted once; config changes take effect on the next page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default DsgnTweaks;
