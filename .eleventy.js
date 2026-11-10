const markdownIt = require("markdown-it");

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false
});

const DEFAULT_LOCALE = "nl";

// Resolves a possibly-localized value to a string for the given lang.
// - String/number/boolean → returned as-is (non-translatable values like URLs, image paths)
// - Object with locale keys → returns the lang key, falls back to default locale
// - Array or other → returned as-is
function localize(value, lang) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    if (Object.prototype.hasOwnProperty.call(value, lang) || Object.prototype.hasOwnProperty.call(value, DEFAULT_LOCALE)) {
      const v = value[lang];
      if (v !== undefined && v !== null && v !== "") return v;
      return value[DEFAULT_LOCALE] ?? "";
    }
    return value;
  }
  return value;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Pick a localized value for the given language.
  eleventyConfig.addFilter("t", (value, lang) => localize(value, lang || DEFAULT_LOCALE));

  // Values of a data-directory object (e.g. menu/*.json), so they can be sorted.
  eleventyConfig.addFilter("objectValues", (value) => {
    if (!value || typeof value !== "object") return [];
    return Object.values(value);
  });

  // Agenda items (agenda/*.json) from today onward, soonest first. Dates are "YYYY-MM-DD".
  // Each gets an `anchor` for links like /evenementen/#workshop-vegetarische-kimchi: the file
  // name without its date, so a shared link always points at the next event with that name.
  eleventyConfig.addFilter("upcomingEvents", (value) => {
    if (!value || typeof value !== "object") return [];
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
    const used = new Set();
    const events = Object.entries(value)
      .filter(([, event]) => event && event.date && String(event.date).slice(0, 10) >= today)
      .sort(([, a], [, b]) => String(a.date).localeCompare(String(b.date)) || String(a.time || "").localeCompare(String(b.time || "")))
      .map(([file, event]) => {
        const short = file.replace(/^\d{4}-\d{2}-\d{2}-/, "");
        const anchor = used.has(short) ? file : short;
        used.add(anchor);
        return { ...event, anchor };
      });

    // An event linked from another event's programme (the kimchi workshop on a workshop
    // evening) gets `partOf`, so its card can point back to that evening.
    const byAnchor = new Map(events.map((event) => [event.anchor, event]));
    events.forEach((parent) => {
      ((parent.programme && parent.programme.makers) || []).forEach((maker) => {
        (maker.workshops || []).forEach((workshop) => {
          const match = String(workshop.link || "").match(/#([\w-]+)$/);
          const child = match && byAnchor.get(match[1]);
          if (child && child !== parent) child.partOf = { anchor: parent.anchor, title: parent.title };
        });
      });
    });
    return events;
  });

  // Agenda items whose date has passed, most recent first, at most `limit`.
  eleventyConfig.addFilter("pastEvents", (value, limit) => {
    if (!value || typeof value !== "object") return [];
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
    return Object.values(value)
      .filter((event) => event && event.date && String(event.date).slice(0, 10) < today)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .slice(0, limit || undefined);
  });

  // Format an agenda date: "day" (3), "month" (dec), "long" (donderdag 3 december) or "dmy" (3 december 2026).
  eleventyConfig.addFilter("eventDate", (value, lang, style) => {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return value;
    const date = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3]));
    const locale = (lang || DEFAULT_LOCALE) === "en" ? "en-GB" : "nl-NL";
    const options = {
      day: { day: "numeric" },
      month: { month: "short" },
      long: { weekday: "long", day: "numeric", month: "long" },
      dmy: { day: "numeric", month: "long", year: "numeric" }
    }[style || "long"];
    return new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...options }).format(date).replace(/\.$/, "");
  });

  // Render arbitrary markdown.
  eleventyConfig.addFilter("markdown", (value) => {
    if (!value) return "";
    return md.render(String(value));
  });

  eleventyConfig.addFilter("markdownInline", (value) => {
    if (!value) return "";
    return md.renderInline(String(value));
  });

  // Render a localized markdown field: "{{ field | mdLocalized(lang) }}"
  eleventyConfig.addFilter("mdLocalized", (value, lang) => {
    const str = localize(value, lang || DEFAULT_LOCALE);
    if (!str) return "";
    return md.render(String(str));
  });

  // Split a localized markdown field after its first paragraph: [lead, rest], both rendered.
  eleventyConfig.addFilter("mdLeadAndRest", (value, lang) => {
    const str = String(localize(value, lang || DEFAULT_LOCALE) || "").trim();
    if (!str) return ["", ""];
    const [lead, ...rest] = str.split(/\n\s*\n/);
    return [md.render(lead), rest.length ? md.render(rest.join("\n\n")) : ""];
  });

  // Prepend /en/ etc. to a static URL when the target lang is non-default.
  // Skips external URLs, mailto/tel/anchor links.
  eleventyConfig.addFilter("localizedUrl", (url, lang) => {
    if (!url) return url;
    if (!lang || lang === DEFAULT_LOCALE) return url;
    if (typeof url !== "string") return url;
    if (url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("#")) return url;
    if (url === "/") return "/" + lang + "/";
    return "/" + lang + url;
  });

  // Given the current page URL, return the URL for the same logical page in another language.
  eleventyConfig.addFilter("switchLang", (currentUrl, targetLang) => {
    if (!currentUrl) return "/";
    let stripped = currentUrl;
    const prefixMatch = stripped.match(/^\/([a-z]{2})(\/|$)/);
    if (prefixMatch && prefixMatch[1] !== DEFAULT_LOCALE) {
      stripped = stripped.slice(prefixMatch[1].length + 1) || "/";
      if (!stripped.startsWith("/")) stripped = "/" + stripped;
    }
    if (!targetLang || targetLang === DEFAULT_LOCALE) {
      return stripped;
    }
    if (stripped === "/") return "/" + targetLang + "/";
    return "/" + targetLang + stripped;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
