import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { init, type DesignTweaksConfig } from "dsgn-tweaks";

/**
 * Next.js App Router component: like dsgn-tweaks/react, but layout switches go through the Next
 * router (soft navigation, scroll kept). Pair it with createDesignRoute from dsgn-tweaks/server.
 */
export function DsgnTweaks({ config }: { config?: DesignTweaksConfig }) {
  const router = useRouter();
  useEffect(() => {
    const panel = init({ navigate: (url) => router.replace(url, { scroll: false }), ...config });
    return () => panel.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default DsgnTweaks;
