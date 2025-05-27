module.exports = {
  pagination: {
    data: "collections.voyages['45.205']",
    size: 1,
    alias: "etape"
  },
  eleventyComputed: {
    title: data => data.etape?.data?.title,
    date: data => data.etape?.data?.date,
    imgFolder: data => data.etape?.data?.imgFolder
  },
  permalink: data => {
    return data.etape?.fileSlug && `/fr/voyages-a-pied/45.205/${data.etape.fileSlug}/`;
  },
  layout: "layouts/voyage.njk"
};

