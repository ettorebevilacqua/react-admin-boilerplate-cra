/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UserPage = lazyLoad(
  () => import('./index'),
  module => (module as any).UserPage,
);
