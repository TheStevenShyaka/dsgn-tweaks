"use client";

// src/next.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { init } from "dsgn-tweaks";
function DsgnTweaks({ config }) {
  const router = useRouter();
  useEffect(() => {
    const panel = init({ navigate: (url) => router.replace(url, { scroll: false }), ...config });
    return () => panel.destroy();
  }, []);
  return null;
}
var next_default = DsgnTweaks;
export {
  DsgnTweaks,
  next_default as default
};
