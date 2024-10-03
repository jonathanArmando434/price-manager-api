import { prisma } from "../../../../prisma";
import { AppError } from "../../../../shared/AppError";
import { Product } from "../../Product";
import { ProductRepository } from "../ProductRepository";

export class InDatabaseProductRepository implements ProductRepository {
    async save(product: Product) {
        const productSaved = await prisma.product.create({
            data: product
        });

        return productSaved;
    }

    async find(id: number) {
        const product = await prisma.product.findFirst({
            where: {
                id
            }
        });

        if (!product) {
            return new AppError("Product not found");
        }

        return product;
    }
    
    async findAll() {
        return await prisma.product.findMany();
    }

    async findBySubscriber(subscriberId: number) {
        const product = await prisma.product.findMany({
            where: {
                subscriberId
            }
        });

        return product;
    } 

    async update(id: number, product: Product) {
        const productUpdated = await prisma.product.update({
            where: {
                id
            },
            data: product
        });

        return productUpdated;      
    }

    async updatePricesByCurrency(currencyId: number, exchange: number, subscriberId: number) {
        const result = await prisma.$executeRaw`
        UPDATE product
        SET priceInKZ = originalPrice * ${exchange}
        WHERE subscriberId = ${subscriberId} AND currencyId = ${currencyId}
    `;

        if(result < 1) {
            return new AppError('No price has been updated');
        }
        
        return result;
    }

    async delete(id: number) {
        const product = await prisma.product.delete({
            where:{
                id
            }
        });

        return product
    }
}