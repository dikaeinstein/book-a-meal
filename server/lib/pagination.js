
import { sequelize } from '../models';

/**
 * @description Checks if there is next page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 *
 * @returns {boolean}
 */
const hasNextPage = (page, totalPages) => page < totalPages;


/**
 * @description Checks if there is previous page
 *
 * @param {number} page Current Page number
 * @param {number} totalPages Total number of pages based
 *
 * @returns {boolean}
 */
const hasPreviousPage = (page, totalPages) =>
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
const hasLastPage = (page, totalPages, count, limit) =>
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
const hasFirstPage = (page, count, limit) => page > 1 && count > limit;


/**
 * @description Build links array used for traversing resources
 *
 * @param {String} resourceUrl Api endpoint without query params
 * @param {Number} page Current Page number
 * @param {Number} totalPages Total number of pages based
 * @param {Number} count Total number of rows
 * @param {Number} limit Maximum content per page
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

/**
 * Returns the count of meals in a menu
 *
 * @param {Number} menuId Menu id
 *
 * @returns {Number} Meals count
 */
export const menuMealsCount = async (menuId) => {
  try {
    const result = await sequelize
      .query(
        'SELECT count(meal_menus.menu_id) FROM meal_menus WHERE menu_id = :menuId',
        { replacements: { menuId }, type: sequelize.QueryTypes.SELECT },
      );
    return result[0].count;
  } catch (error) {
    throw error;
  }
};
