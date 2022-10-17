import { feed } from '../modules/feed';

export const get = () => ({ body: feed.rss2() });
