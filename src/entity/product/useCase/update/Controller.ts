import { z } from "zod";
import { Request, Response } from "express";
import { UseCase } from "./UseCase";
import { AppError } from "../../../../shared/AppError";

export class Controller {
    constructor(
        readonly useCase: UseCase,
    ){}

    async handle(req: Request, res: Response){
        try {
            const { id } = req.query;
            const { product } = req.body;

            const productSchema = z.object({
                id: z.number().optional(),
                name: z.string({ required_error: 'name required' }),
                mark: z.string({ required_error: 'mark required' }),
                model: z.string({ required_error: 'model required' }),
                originalPrice: z.number({ required_error: 'originalPrice required' }),
                priceInKZ: z.number({ required_error: 'priceInKZ required' }),
                subscriberId: z.number({ required_error: 'subscriberId required' }),
                currencyId: z.number({ required_error: 'currencyId required' }),
            });

            const schema = z.object({
                id: z.string({ required_error: 'product id required' }),
                product: productSchema
            });
    
            const validated = schema.parse({
                id, product
            })

            const idAsInt: number = parseInt(validated.id, 10);

            const productUpdated = await this.useCase.execute(
                idAsInt,
                validated.product
            );
            
            if(productUpdated instanceof AppError){
                return res.status(404).json({ message: productUpdated.message });
            }

            return res.status(200).json({ product: productUpdated });
        } catch (error) {
            if(error instanceof z.ZodError){
                return res.status(400).json({error: error.errors});
            }else if(error instanceof Error) {
                return res.status(500).json({ message: 'internal server error', detail: error.message });
            }
        }
    }
}