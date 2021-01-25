/**
 * In-Memory Database: Redis Implementation for Typescript
 * docs: https://github.com/NodeRedis/node-redis
 */

 import { RedisClient } from 'redis';
import { ICacheManager } from './interface';

export default class CacheManager implements ICacheManager<RedisClient> {
    private client: RedisClient;

    constructor (client: RedisClient) {
        this.client = client;
    }

    async set (): Promise<void> {

    }

    async get (): Promise<void> {

    }

    async flush (): Promise<void> {

    }
}
