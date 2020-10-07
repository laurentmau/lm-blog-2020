"use strict";

var _require = require("luxon"),
    DateTime = _require.DateTime;

var fs = require("fs");

var pluginRss = require("@11ty/eleventy-plugin-rss");

var pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

var pluginNavigation = require("@11ty/eleventy-navigation");

var markdownIt = require("markdown-it");

var markdownItAnchor = require("markdown-it-anchor");

var path = require("path");

var moment = require("moment");

var manifestPath = path.resolve(__dirname, "dist", "scripts", "manifest.json");
var manifest = JSON.parse(fs.readFileSync(manifestPath, {
  encoding: "utf8"
}));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/posts/*.md");
  });
  eleventyConfig.addCollection("posts_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/posts/*.md");
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addLayoutAlias("post", "src/layouts/post.njk");
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("dd LLL yyyy");
  }); // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string

  eleventyConfig.addFilter('htmlDateString', function (dateObj) {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-LL-dd');
  }); // Get the first `n` elements of a collection.

  eleventyConfig.addFilter("head", function (array, n) {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });
  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css"); // Add a shortcode for bundled CSS.

  eleventyConfig.addShortcode("bundledCss", function () {
    return manifest["main.css"] ? "<link href=\"".concat(manifest["main.css"], "\" rel=\"stylesheet\" />") : "";
  }); // Add a shortcode for bundled JS.

  eleventyConfig.addShortcode("bundledJs", function () {
    return manifest["main.js"] ? "<script src=\"".concat(manifest["main.js"], "\"></script>") : "";
  });
  /* Markdown Overrides */

  /*   let markdownLibrary = markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#"
    });
    eleventyConfig.setLibrary("md", markdownLibrary); */
  // date filter (localized)

  eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  }); // Browsersync Overrides

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function ready(err, browserSync) {
        var content_404 = fs.readFileSync('dist/404.html');
        browserSync.addMiddleware("*", function (req, res) {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    },
    ui: false,
    ghostMode: false
  });
  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/
    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // These are all optional, defaults are shown:
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    buildTime: new Date(),
    en: {
      metaTitle: "Title in english",
      metaDescription: "Description in english"
    },
    fr: {
      metaTitle: "Titre en français",
      metaDescription: "Description en français"
    }
  };
};