export interface ICacheManager<t> {
    set<y> (key: string, value: y): Promise<void>;
    get<u> (key: string): Promise<u>;
    scan (key: string): Promise<string[]>;
    flush (): Promise<any>;
    targetFlush (keys: string): Promise<void>;
    inspect<i> (key: string, repo: any): Promise<i>;
}
