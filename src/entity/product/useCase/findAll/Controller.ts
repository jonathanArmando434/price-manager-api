import { Request, Response } from 'express';
import { UseCase } from "./UseCase";

export class Controller {
    constructor(readonly useCase: UseCase){}

    async handle(req: Request, res: Response) {
       try {
        const products = await this.useCase.execute();
        return res.status(200).json({products: products});
       } catch (error) {
        return res.status(500).json({ message: 'internal server error', details: error });
       }
    }
}