import { DesignTweaksConfig } from 'dsgn-tweaks';

/**
 * React component for any React app (Vite, Remix, React Router, Gatsby…). Renders nothing; mounts
 * the panel once. Render it in development only. In Next.js use dsgn-tweaks/next instead.
 */
declare function DsgnTweaks({ config }: {
    config?: DesignTweaksConfig;
}): null;

export { DsgnTweaks, DsgnTweaks as default };
