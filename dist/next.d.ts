import { DesignTweaksConfig } from 'dsgn-tweaks';

/**
 * Next.js App Router component: like dsgn-tweaks/react, but layout switches go through the Next
 * router (soft navigation, scroll kept). Pair it with createDesignRoute from dsgn-tweaks/server.
 */
declare function DsgnTweaks({ config }: {
    config?: DesignTweaksConfig;
}): null;

export { DsgnTweaks, DsgnTweaks as default };
