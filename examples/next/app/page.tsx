import type { DesignTweaksConfig } from "dsgn-tweaks";
import { DsgnTweaks } from "dsgn-tweaks/next";

const HERO = [
  { id: "split", label: "Split" },
  { id: "centered", label: "Centered" },
] as const;

const config: DesignTweaksConfig = {
  explorations: [{ param: "hero", label: "Hero", options: HERO }],
  tokens: [
    { key: "paper", label: "Paper", light: "#fafaf9", dark: "#0a0a0a" },
    { key: "pitch", label: "Text", light: "#0a0a0a", dark: "#fafaf9" },
    { key: "hairline", label: "Hairline", light: "#0a0a0a14", dark: "#ffffff1a" },
    { key: "accent", label: "Accent", light: "#f65009" },
    { key: "on-accent", label: "On accent", light: "#ffffff" },
  ],
  theme: { storageKey: "example-theme", attribute: "data-theme" },
};

const FEATURES = [
  { title: "Ship on Fridays", body: "Preview environments for every branch, torn down when it merges." },
  { title: "Readable by default", body: "Type, spacing and colour tokens that hold up from phone to wall screen." },
  { title: "Yours to keep", body: "Plain files in your repo. No lock-in, no seats, no surprises." },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ hero?: string }> }) {
  const { hero } = await searchParams;
  const centered = hero === "centered";
  return (
    <>
      <div data-design-root>
        <section id="hero" className="mx-auto max-w-5xl px-6 py-24">
          <div className={centered ? "mx-auto max-w-2xl text-center" : "grid items-end gap-10 md:grid-cols-[1.3fr_1fr]"}>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">Software your team can rely on.</h1>
            <div className={centered ? "mt-6" : ""}>
              <p className="text-lg leading-relaxed opacity-70">
                Northwind builds and runs the systems behind clinics, schools and small businesses.
              </p>
              <div className={centered ? "mt-8 flex justify-center gap-3" : "mt-8 flex gap-3"}>
                <a href="#contact" className="rounded-md bg-accent px-5 py-3 font-medium text-on-accent">
                  Talk to us
                </a>
                <a href="#features" className="rounded-md border border-hairline px-5 py-3 font-medium">
                  See the work
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="border-t border-hairline">
          <div className="mx-auto grid max-w-5xl gap-px bg-hairline md:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="bg-paper px-6 py-10">
                <h2 className="text-xl font-semibold tracking-tight">{f.title}</h2>
                <p className="mt-3 leading-relaxed opacity-70">{f.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pricing" className="border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-50">Pricing</p>
            <p className="mt-4 max-w-xl text-3xl font-semibold tracking-tight">One plan. Everything included. Cancel any time.</p>
          </div>
        </section>
      </div>
      {process.env.NODE_ENV === "development" && <DsgnTweaks config={config} />}
    </>
  );
}
