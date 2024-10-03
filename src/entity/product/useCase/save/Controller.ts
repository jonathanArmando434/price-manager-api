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
            const { subscriber } = req.params;
            const { name, mark, model, originalPrice, priceInKZ, currency } = req.body;

            const schema = z.object({
                subscriber: z.string({ required_error: 'subscriber required' }),
                name: z.string({ required_error: 'name required' }),
                mark: z.string({ required_error: 'mark required' }),
                model: z.string({ required_error: 'model required' }),
                originalPrice: z.number({ required_error: 'original price required' }).positive('original price must be positive'),
                priceInKZ: z.number({ required_error: 'price in kz required' }).positive('price in kz must be positive'),
                currency: z.number({ required_error: 'currency required' }),
            });
    
            const validated = schema.parse({
                subscriber, name, mark, model, originalPrice, priceInKZ, currency
            })

            const subscriberAsInt: number = parseInt(subscriber, 10);

            const productSaved = await this.useCase.execute(
                validated.name, 
                validated.mark, 
                validated.model, 
                validated.originalPrice, 
                validated.priceInKZ, 
                subscriberAsInt,
                validated.currency
            );
            
            if(productSaved instanceof AppError){
                return res.status(404).json({ message: productSaved.message });
            }

            return res.status(201).json({ product: productSaved });
        } catch (error) {
            if(error instanceof z.ZodError){
                return res.status(400).json({error: error.errors});
            }else if(error instanceof Error) {
                return res.status(500).json({ message: 'internal server error', detail: error.message });
            }
        }
    }
}