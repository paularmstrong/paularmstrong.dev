import { feed } from '../modules/feed';

export const get = () => ({ body: feed.json1() });
