import { SubscriberRepository } from "../../../subscriber/repository/SubscriberRepository";
import { ProductRepository } from "../../repository/ProductRepository";
import { AppError } from "../../../../shared/AppError";
import { Product } from "../../Product";

export class UseCase {
    constructor(
        readonly subscriberRepository: SubscriberRepository,
        readonly productRepository: ProductRepository
    ){}

    async execute(name: string, mark: string, model: string, originalPrice: number, priceInKZ: number, subscriberId: number, currencyId: number){
        const subscriberOrError = await this.subscriberRepository.find(subscriberId);

        if(subscriberOrError instanceof AppError) {
            return subscriberOrError;
        }

        const product: Product = {
            name, mark, model, originalPrice, priceInKZ, subscriberId, currencyId
        }
        
        return await this.productRepository.save(product);
    }
}