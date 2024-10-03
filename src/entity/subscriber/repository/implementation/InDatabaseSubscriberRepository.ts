import { prisma } from "../../../../prisma";
import { AppError } from "../../../../shared/AppError";
import { SubscriberRepository } from "../SubscriberRepository";

export class InDatabaseSubscriberRepository implements SubscriberRepository {
    async find(id: number) {
        const subscriber = await prisma.subscriber.findFirst({
            where: {
                id
            }
        });

        if (!subscriber) {
            return new AppError("Subscriber not found");
        }

        return subscriber;
    }
}