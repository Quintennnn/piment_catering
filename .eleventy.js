module.exports = function(eleventyConfig) {
  // Pass through the css and assets folders to the compiled site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin"); // For Decap CMS

  return {
    dir: {
      input: "src",    
      output: "_site",
      includes: "_includes" // Base layouts
    }
  };
};
