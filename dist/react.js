"use client";

// src/react.ts
import { useEffect } from "react";
import { init } from "dsgn-tweaks";
function DsgnTweaks({ config }) {
  useEffect(() => {
    const panel = init(config);
    return () => panel.destroy();
  }, []);
  return null;
}
var react_default = DsgnTweaks;
export {
  DsgnTweaks,
  react_default as default
};
