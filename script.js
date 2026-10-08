// The page is complete without JavaScript: every class is in the HTML.
// This file adds filtering, menu behavior, current-section marking and form handling.
// It is shared by every page; the filter and contact-form blocks run only where those elements exist.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- schedule filters (state kept in the URL so a filtered view can be shared or reloaded) ----
  const form = $("#filters");
  if (form) {
  // open fencing and lesson slots (.row.open) are not classes: they are never filtered or counted
  const rows = $$(".row:not(.open)");
  const days = $$(".day");
  const status = $("#status");
  const none = $("#none");
  const KEYS = ["age", "level", "weapon"];

  function readURL() {
    const p = new URLSearchParams(location.search);
    KEYS.forEach((k) => {
      const el = form.elements[k];
      const v = p.get(k) || "";
      el.value = [...el.options].some((o) => o.value === v) ? v : "";
    });
  }

  function apply(updateURL) {
    const f = Object.fromEntries(KEYS.map((k) => [k, form.elements[k].value]));
    let shown = 0;
    rows.forEach((r) => {
      const ages = r.dataset.ages.split(" ").filter(Boolean);
      const levels = r.dataset.level.split(" ").filter(Boolean);
      // an empty value in the data means "not specified", which matches any filter
      const ok =
        (!f.age || !ages.length || ages.includes(f.age)) &&
        (!f.level || !levels.length || levels.includes(f.level)) &&
        (!f.weapon || !r.dataset.weapon || r.dataset.weapon === f.weapon);
      r.hidden = !ok;
      if (ok) shown++;
    });
    // a day with no matches keeps its column in the week grid; CSS hides it in the one-column phone list
    days.forEach((d) => d.classList.toggle("empty", !$$(".row:not(.open):not([hidden])", d).length));
    none.hidden = shown > 0;
    const active = KEYS.some((k) => f[k]);
    status.textContent = active
      ? shown ? `Showing ${shown} of ${rows.length} weekly classes.` : ""
      : `${rows.length} weekly classes.`;
    if (updateURL) {
      const p = new URLSearchParams();
      KEYS.forEach((k) => f[k] && p.set(k, f[k]));
      const q = p.toString();
      history.replaceState(null, "", location.pathname + (q ? "?" + q : "") + location.hash);
    }
  }

  form.hidden = false;
  readURL();
  apply(false);
  form.addEventListener("change", () => apply(true));
  form.addEventListener("reset", () => setTimeout(() => apply(true)));
  $("#none-reset").addEventListener("click", () => { form.reset(); form.elements.age.focus(); });
  }

  // ---- mobile menu ----
  const btn = $(".menu-btn"), nav = $("#nav");
  const setMenu = (open, returnFocus) => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    if (!open && returnFocus) btn.focus();
  };
  btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) setMenu(false, true);
  });
  matchMedia("(min-width: 1101px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  // ---- mark the current section in the nav ----
  // only same-page anchors take part; links to other pages keep their static aria-current="page"
  const links = $$("#nav a").filter((a) => a.getAttribute("href").startsWith("#"));
  const targets = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    targets.forEach((t) => io.observe(t));
  }

  // ---- contact form: validates, keeps input, opens an email draft ----
  const cf = $("#contact-form");
  if (cf) {
  const sent = $("#sent");
  const MSG = {
    name: "Enter your name.",
    email: "Enter an email address we can reply to, like name@example.com.",
    msg: "Tell us what you are looking for, even if it is just a question.",
  };
  const fieldOf = (el) => el.closest(".field");
  function check(el) {
    const bad = el.validity.valueMissing || (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
    const key = el.name;
    const err = $("#e-" + key);
    fieldOf(el).classList.toggle("invalid", bad);
    if (bad) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    if (bad) { err.textContent = MSG[key]; el.setAttribute("aria-describedby", [el.getAttribute("aria-describedby"), err.id].filter((v, i, a) => v && a.indexOf(v) === i).join(" ")); }
    err.hidden = !bad;
    return !bad;
  }
  const fields = $$("input, textarea", cf);
  // validate after the user leaves a field, and re-check as they fix it
  fields.forEach((el) => {
    el.addEventListener("blur", () => { if (el.value || fieldOf(el).classList.contains("invalid")) check(el); });
    el.addEventListener("input", () => { if (fieldOf(el).classList.contains("invalid")) check(el); });
  });
  cf.addEventListener("submit", (e) => {
    e.preventDefault();
    sent.hidden = true;
    const bad = fields.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); return; }
    const f = new FormData(cf);
    const body = `${f.get("msg")}\n\nName: ${f.get("name")}\nEmail: ${f.get("email")}`;
    location.href = `mailto:gofencegeorgia@gmail.com?subject=${encodeURIComponent("Fencing class inquiry")}&body=${encodeURIComponent(body)}`;
    sent.hidden = false;
  });
  }

  $("#yr").textContent = new Date().getFullYear();
})();
