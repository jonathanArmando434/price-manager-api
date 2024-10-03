import HttpServer from '../shared/HttpServer'
import express from "express";

export default class ExpressAdapter implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
	}

	async register(method: string, url: string, callback: Function) {
		this.app[method](url, function (req: any, res: any) {
			const output = callback(req.params, req.body);
			res.json(output);
		});
	}

	listen(port: string | number, handle?: any) {
		return this.app.listen(port, handle);
	}

    async use(...config: any) {
        return this.app.use(...config);
    }

    json() {
        return this.app.json();
    }
}