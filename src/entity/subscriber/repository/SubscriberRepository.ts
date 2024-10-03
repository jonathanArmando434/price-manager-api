import { AppError } from "../../../shared/AppError";
import { Subscriber } from "../Subscriber";

export interface SubscriberRepository {
  find(id: number): Promise<Subscriber | AppError>;
}