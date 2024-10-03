import { ProductRepository } from "../../repository/ProductRepository";
import { AppError } from "../../../../shared/AppError";

export class UseCase {
    constructor(
        readonly productRepository: ProductRepository,
    ){}

    async execute(id: number) {
        const productOrError = await this.productRepository.find(id);

        if(productOrError instanceof AppError) {
            return productOrError;
        }

        return productOrError;
    }
}