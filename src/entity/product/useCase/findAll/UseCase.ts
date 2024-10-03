import { ProductRepository } from "../../repository/ProductRepository";

export class UseCase {
    constructor(
        readonly productRepository: ProductRepository,
    ){}

    async execute() {
        const products = await this.productRepository.findAll();
        return products;
    }
}