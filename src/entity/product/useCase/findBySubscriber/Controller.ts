import { AppError } from "../../../../shared/AppError";
import { UseCase } from "./UseCase";
import { Request, Response } from 'express';
import { z } from "zod";

export class Controller {
    constructor(
        readonly useCase: UseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            const { subscriber } = req.params;

            const schema = z.string({required_error: "subscriber required"});

            const validated = schema.parse(subscriber);

            const subscriberAsInt: number = parseInt(subscriber, 10);

            const products = await this.useCase.execute(subscriberAsInt);

            if(products instanceof AppError) {
                return res.status(404).json({message: products.message});
            }

            return res.status(200).json({ products: products });
        } catch (error) {
            if(error instanceof z.ZodError){
                return res.status(400).json({error: error.errors});
            }else if(error instanceof Error) {
                return res.status(500).json({ message: 'internal server error', detail: error.message });
            }
        }
    }
}