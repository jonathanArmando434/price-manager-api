import { SubscriberRepository } from "../../../subscriber/repository/SubscriberRepository";
import { ProductRepository } from "../../repository/ProductRepository";
import { AppError } from "../../../../shared/AppError";
import { Product } from "../../Product";

export class UseCase {
    constructor(
        readonly productRepository: ProductRepository
    ){}

    async execute(id: number, product: Product){
        const productOrError = await this.productRepository.find(id);

        if(productOrError instanceof AppError) {
            return productOrError;
        }
        
        return await this.productRepository.update(id, product);
    }
}