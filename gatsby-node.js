exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  const newPage = page;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/wiki/)) {
    newPage.matchPath = '/wiki/*';

    // Update the page.
    createPage(page);
  }
};
