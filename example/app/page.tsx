import { Suspense } from "react";
import { DesignTweaks, type DesignTweaksConfig } from "dsgn-tweaks";

const HERO = [
  { id: "split", label: "Split" },
  { id: "centered", label: "Centered" },
] as const;

const config: DesignTweaksConfig = {
  explorations: [{ param: "hero", label: "Hero", options: HERO }],
  tokens: [
    { key: "paper", label: "Paper", light: "#fafaf9", dark: "#0a0a0a" },
    { key: "pitch", label: "Text", light: "#0a0a0a", dark: "#fafaf9" },
    { key: "accent", label: "Accent", light: "#f65009" },
    { key: "on-accent", label: "On accent", light: "#ffffff" },
  ],
  theme: { storageKey: "example-theme", attribute: "data-theme" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ hero?: string }> }) {
  const { hero } = await searchParams;
  const centered = hero === "centered";
  return (
    <>
      <div data-design-root>
        <section id="hero" className={centered ? "px-6 py-24 text-center" : "grid gap-8 px-6 py-24 md:grid-cols-2"}>
          <h1 className="text-5xl font-semibold tracking-tight">Software people rely on.</h1>
          <p className="text-lg opacity-70">Edit this text, restyle it, or switch the hero layout from the panel.</p>
        </section>
        <section id="features" className="border-t border-hairline px-6 py-16">
          <h2 className="text-3xl font-semibold">Features</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li>Fast</li>
            <li>Accessible</li>
            <li>Yours</li>
          </ul>
        </section>
        <section id="contact" className="border-t border-hairline px-6 py-16">
          <a href="#contact" className="inline-block rounded bg-accent px-5 py-3 text-on-accent">
            Talk to us
          </a>
        </section>
      </div>
      {process.env.NODE_ENV === "development" && (
        <Suspense>
          <DesignTweaks config={config} />
        </Suspense>
      )}
    </>
  );
}
