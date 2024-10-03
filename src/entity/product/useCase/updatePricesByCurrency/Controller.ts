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
            const { currency, exchange } = req.body;

            const schema = z.object({
                subscriber: z.string({ required_error: 'subscriber required' }),
                currency: z.string({ required_error: 'currency required' }),
                exchange: z.number({ required_error: 'exchange required' }),
            });
    
            const validated = schema.parse({
                subscriber, currency, exchange
            })

            const subscriberAsInt: number = parseInt(subscriber, 10);

            const result = await this.useCase.execute(
                validated.currency, 
                validated.exchange, 
                subscriberAsInt
            );
            
            if(result instanceof AppError){
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({ message: 'Prices updated' });
        } catch (error) {
            if(error instanceof z.ZodError){
                return res.status(400).json({error: error.errors});
            }else if(error instanceof Error) {
                return res.status(500).json({ message: 'internal server error', detail: error.message });
            }
        }
    }
}