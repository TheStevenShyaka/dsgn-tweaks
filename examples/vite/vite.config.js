import { defineConfig } from "vite";
import { dsgnTweaks } from "dsgn-tweaks/vite";

export default defineConfig({
  plugins: [
    dsgnTweaks({
      explorations: [
        { param: "hero", label: "Hero", options: [{ id: "left", label: "Left" }, { id: "centered", label: "Centered" }] },
      ],
      tokens: [{ key: "accent", label: "Accent", light: "#646cff" }],
    }),
  ],
});
