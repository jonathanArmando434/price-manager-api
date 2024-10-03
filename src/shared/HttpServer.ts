export default interface HttpServer {
	register (method: string, url: string, callback: Function): Promise<void>;
	listen (port: string | number, handle: any): Promise<void>;
    use (config: any): Promise<void>;
    json (): Promise<void>;
}