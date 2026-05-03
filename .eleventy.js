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
