const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const path = require("path");
const moment = require("moment");
const livePosts = (p) => p.date <= now && !p.data.draft;
const now = new Date();

const manifestPath = path.resolve(__dirname, "dist", "scripts", "manifest.json");
let manifest = {};

try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));
} catch (e) {
  console.warn("\u26A0\uFE0F  manifest.json introuvable — probablement en développement. On continue sans.");
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/wp-content/uploads": "wp-content/uploads" });
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addCollection("imagesVoyage", function (collectionApi) {
    const fg = require("fast-glob");
    const imageGlob = "src/images/voyages-a-pied/**/*.@(jpg|jpeg|png|webp)";
    const files = fg.sync(imageGlob);
    return files.map((file) => ({
      inputPath: file,
      outputPath: file.replace(/^src\//, ""),
      url: "/" + file.replace(/^src\//, ""),
    }));
  });
  // 2. Crée la collection "voyages" globale (si besoin)
  eleventyConfig.addCollection("voyages", function (collectionApi) {
    const allCollections = {};
    parcoursDirs.forEach((dir) => {
      const globPath = `${basePath}/${dir}/jour-*.md`;
      allCollections[dir] = collectionApi
        .getFilteredByGlob(globPath)
        .sort((a, b) => a.date - b.date);
    });
    return allCollections;
  });
  // 1. Déclare toutes les sous-collections individuellement
  const basePath = "src/fr/voyages-a-pied";
  const parcoursDirs = fs
    .readdirSync(basePath)
    .filter((file) => fs.statSync(path.join(basePath, file)).isDirectory());

  parcoursDirs.forEach((dir) => {
    const globPath = `${basePath}/${dir}/jour-*.md`;

    eleventyConfig.addCollection(`voyage_${dir}`, (collectionApi) => {
      return collectionApi
        .getFilteredByGlob(globPath)
        .sort((a, b) => a.date - b.date);
    });
  });

  eleventyConfig.addCollection("all", (collectionApi) =>
    collectionApi.getAll()
  );

  eleventyConfig.addCollection("posts_en", (collection) =>
    collection.getFilteredByGlob("./src/en/posts/*.md").filter(livePosts)
  );

  eleventyConfig.addCollection("posts_fr", (collection) =>
    collection.getFilteredByGlob("./src/fr/posts/*.md").filter(livePosts)
  );

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "src/layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  );

  eleventyConfig.addFilter("head", (array, n) =>
    n < 0 ? array.slice(n) : array.slice(0, n)
  );

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

  eleventyConfig.addShortcode("bundledCss", function () {
    return manifest["main.css"]
      ? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
      : "";
  });

  eleventyConfig.addShortcode("bundledJs", function () {
    return manifest["main.js"]
      ? `<script src="${manifest["main.js"]}"></script>`
      : "";
  });

  eleventyConfig.addNunjucksFilter("date", (date, format, locale = "en") => {
    moment.locale(locale);
    return moment(date).format(format);
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");
        browserSync.addMiddleware("*", (req, res) => {
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    buildTime: new Date(),
    en: {
      metaTitle: "Title in english",
      metaDescription: "Description in english",
    },
    fr: {
      metaTitle: "Titre en français",
      metaDescription: "Description en français",
    },
  };
};
