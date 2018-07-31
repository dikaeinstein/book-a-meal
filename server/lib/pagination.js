/**
 * @description Checks if there is next page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 *
 * @returns {boolean}
 */
export const hasNextPage = (page, totalPages) => page < totalPages;


/**
 * @description Checks if there is previous page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 *
 * @returns {boolean}
 */
export const hasPreviousPage = (page, totalPages) =>
  page <= totalPages && page > 1;


/**
 * @description Checks if there is last page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 * @param {number} count Total number of rows
 * @param {number} limit Maximum content per page
 *
 * @returns {boolean}
 */
export const hasLastPage = (page, totalPages, count, limit) =>
  page < totalPages && count > limit;


/**
 * @description Checks if there is first page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 * @param {number} count Total number of rows
 * @param {number} limit Maximum content per page
 *
 * @returns {boolean}
 */
export const hasFirstPage = (page, count, limit) =>
  page > 1 && count > limit;


/**
 * @description Build links array used for traversing resources
 *
 * @param {string} resourceUrl Api endpoint without query params
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 * @param {number} count Total number of rows
 * @param {number} limit Maximum content per page
 *
 * @returns {Array} Array of link objects
 */
export const linksURIBuilder = (resourceUrl, page, totalPages, count, limit) => {
  const links = [];
  if (hasNextPage(page, totalPages)) {
    links.push({
      rel: 'next',
      href: `${resourceUrl}?limit=${limit}&page=${page + 1}`,
    });
  }
  if (hasPreviousPage(page, totalPages)) {
    links.push({
      rel: 'previous',
      href: `${resourceUrl}?limit=${limit}&page=${page - 1}`,
    });
  }
  if (hasFirstPage(page, count, limit)) {
    links.push({
      rel: 'first',
      href: `${resourceUrl}?limit=${limit}`,
    });
  }
  if (hasLastPage(page, totalPages, count, limit)) {
    links.push({
      rel: 'last',
      href: `${resourceUrl}?limit=${limit}&page=${totalPages}`,
    });
  }
  // Link for current page
  links.push({
    rel: 'self',
    href: `${resourceUrl}?limit=${limit}&page=${page}`,
  });

  return links;
};
