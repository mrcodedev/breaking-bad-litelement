/**
 * @typedef {object} PageLinks
 * @property {number} PageLink.id - Array number page
 * @property {number} PageLink.number - Active number page
 * @property {boolean} PageLink.active - Is active Page
 */
interface PageLinks {
  /**
   * id: Array number page
   */
  id: number;

  /**
   * page: Active number page
   */
  page: number;

  /**
   * active: Is active Page
   */
  active: boolean;
}

type DataSection = 'change-active-page' | 'previous-page' | 'next-page';

export {PageLinks, DataSection};
