import * as Redis from 'redis';

type configType = {
    host: string,
    port: number,
};

export default class RedisConnector {
    private config: configType;
    private client: Redis.RedisClient;

    constructor (config: configType) {
        this.config = config;
    }

    async initConnection (): Promise<Redis.RedisClient> {
        this.client = Redis.createClient(this.config);
        return this.client;
    }
}
