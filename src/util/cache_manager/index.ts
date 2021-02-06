/**
 * In-Memory Database: Redis Implementation for Typescript
 * docs: https://github.com/NodeRedis/node-redis
 */
const { promisify } = require('util');
import { RedisClient } from 'redis';
import { ICacheManager } from './interface';

export default class CacheManager implements ICacheManager<RedisClient> {
    private cache: RedisClient;

    constructor (client: RedisClient) {
        this.cache = client;
    }

    async inspect<t> (key: string, repo: any): Promise<t> {
        let result: t;

        result = await this.get<t>(key);

        if (!result) {
            result = await repo;
            await this.set<t>(key, result);
        }

        return result;
    }

    async set<t> (key: string, value: t): Promise<void> {
        const asyncSet = promisify(this.cache.set).bind(this.cache);

        try {
            await asyncSet(key, JSON.stringify(value));
        } catch (error) {
            return null;
        }
    }

    async get<t> (key: string): Promise<t> {
        const asyncGet = promisify(this.cache.get).bind(this.cache);

        try {
            const cache = await asyncGet(key);
            return JSON.parse(cache);
        } catch (error) {
            return null;
        }
    }

    async scan (key: string): Promise<string[]> {
        const asyncScan = promisify(this.cache.scan).bind(this.cache);

        try {
            let keys: string[];
            const [_, cacheKeys] = await asyncScan(0, 'MATCH', `${key}*`);

            keys = cacheKeys;
            return keys;
        } catch (error) {
            return null;
        }
    }

    async flush (): Promise<void> {}

    async targetFlush (key: string): Promise<void> {
        const asyncDel = promisify(this.cache.del).bind(this.cache);

        try {
            const keys = await this.scan(key);
            await Promise.all(keys.map(key => asyncDel(key)));
        } catch (error) {
            return null;
        }
    }
}
