import { z } from 'zod';
import { Request, Response } from 'express';
import { UseCase } from "./UseCase";
import { AppError } from '../../../../shared/AppError';

export class Controller {
    constructor(readonly useCase: UseCase){}

    async handle(req: Request, res: Response) {
       try {
        const { id } = req.query;

        const schema = z.string({required_error: 'Product ID required'});

        const validated = schema.parse( id );

        const idAsInt: number = parseInt(validated, 10);

        const product = await this.useCase.execute(idAsInt);

        if(product instanceof AppError){
            return res.status(404).json({message: product.message});
        }

        return res.status(200).json({product: product});
       } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(400).json({error: error.errors});
        }else if(error instanceof Error) {
            return res.status(500).json({ message: 'internal server error', detail: error.message });
        }
       }
    }
}