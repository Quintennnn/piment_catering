const markdownIt = require("markdown-it");

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false
});

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addFilter("markdown", (value) => {
    if (!value) return "";
    return md.render(String(value));
  });

  eleventyConfig.addFilter("markdownInline", (value) => {
    if (!value) return "";
    return md.renderInline(String(value));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
