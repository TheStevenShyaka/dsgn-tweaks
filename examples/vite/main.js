import "./style.css";

// Any framework renders here; plain DOM keeps the example small. ?hero= picks the layout.
const hero = new URLSearchParams(location.search).get("hero") ?? "left";
document.querySelector("#app").innerHTML = `
  <section id="hero" class="hero ${hero}">
    <h1>Vite, designed live.</h1>
    <p>React, Vue, Svelte or plain JS: the plugin adds the panel in dev.</p>
  </section>
  <section id="pricing">
    <h2>Pricing</h2>
    <p>One plan. Everything included.</p>
    <a class="cta" href="#pricing">Start</a>
  </section>
`;
