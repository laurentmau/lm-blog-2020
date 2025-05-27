console.log("== DEBUG: collections.voyages['45.205'] ==");
module.exports = {
  pagination: {
    data: "collections.voyages['45.205']",
    size: 1,
    alias: "etape"
  },
  layout: "layouts/voyage.njk",
  permalink: (data) =>
    data.etape?.fileSlug &&
    `/fr/voyages-a-pied/45.205/${data.etape.fileSlug}/`,
  eleventyComputed: {
    title: (data) => data.etape?.data?.title,
    date: (data) => data.etape?.data?.date,
    imgFolder: (data) => data.etape?.data?.imgFolder
  }
};
console.log("== DEBUG: collections.voyages['45.205'] ==");
module.exports = {
  pagination: {
    data: "collections.voyages['45.205']",
    size: 1,
    alias: "etape",
  },
  layout: "layouts/voyage.njk",
  permalink: (data) =>
    data.etape?.fileSlug && `/fr/voyages-a-pied/45.205/${data.etape.fileSlug}/`,
  eleventyComputed: {
    title: (data) => data.etape?.data?.title,
    date: (data) => data.etape?.data?.date,
    imgFolder: (data) => data.etape?.data?.imgFolder,
  },
};
