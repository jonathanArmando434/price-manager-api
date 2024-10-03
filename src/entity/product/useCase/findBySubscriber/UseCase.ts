import { SubscriberRepository } from "../../../subscriber/repository/SubscriberRepository";
import { ProductRepository } from "../../repository/ProductRepository";
import { AppError } from "../../../../shared/AppError";

export class UseCase {
    constructor(
        readonly subscriberRepository: SubscriberRepository,
        readonly productRepository: ProductRepository,
    ){}

    async execute(subscriberId: number) {
        const subscriberOrError = await this.subscriberRepository.find(subscriberId);

        if(subscriberOrError instanceof AppError) {
            return subscriberOrError;
        }

        const products = await this.productRepository.findBySubscriber(subscriberId);

        return products;
    }
}