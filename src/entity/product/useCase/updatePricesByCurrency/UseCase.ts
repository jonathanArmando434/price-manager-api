import { SubscriberRepository } from "../../../subscriber/repository/SubscriberRepository";
import { CurrencyRepository } from "../../../currency/repository/CurrencyRepository";
import { ProductRepository } from "../../repository/ProductRepository";
import { AppError } from "../../../../shared/AppError";

export class UseCase {
    constructor(
        readonly subscriberRepository: SubscriberRepository,
        readonly currencyRepository: CurrencyRepository,
        readonly productRepository: ProductRepository
    ){}

    async execute(currency: string, exchange: number, subscriberId: number){
        const subscriberOrError = await this.subscriberRepository.find(subscriberId);

        if(subscriberOrError instanceof AppError) {
            return subscriberOrError;
        }

        const currencyOrError = await this.currencyRepository.findByTypeAndSubscriberId(currency, subscriberId);

        if(currencyOrError instanceof AppError) {
            return currencyOrError;
        }

        const currencyId: number = currencyOrError.id ? currencyOrError.id : 0;
        
        return await this.productRepository.updatePricesByCurrency(currencyId, exchange, subscriberId);
    }
}