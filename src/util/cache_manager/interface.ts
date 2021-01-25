export interface ICacheManager<t> {
    set (): Promise<void>;
    get (): Promise<void>;
    flush (): Promise<void>;
}
