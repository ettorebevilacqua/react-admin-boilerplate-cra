/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const GuestPage = lazyLoad(
  () => import('./index'),
  module => module.GuestPage,
);
