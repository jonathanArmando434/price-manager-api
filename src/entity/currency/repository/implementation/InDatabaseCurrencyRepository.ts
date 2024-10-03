import { prisma } from "../../../../prisma";
import { AppError } from "../../../../shared/AppError";
import { CurrencyRepository } from "../CurrencyRepository";

export class InDatabaseCurrencyRepository implements CurrencyRepository {
    async findByTypeAndSubscriberId(type: string, subscriberId: number) {
        const currency = await prisma.currency.findFirst({
            where: {
                type,
                subscriberId
            }
        });

        if (!currency) {
            return new AppError("Currency not found");
        }

        return currency;
    }
}