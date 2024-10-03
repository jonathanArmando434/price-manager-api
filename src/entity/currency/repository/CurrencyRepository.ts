import { AppError } from "../../../shared/AppError";
import { Currency } from "../Currency";

export interface CurrencyRepository {
  findByTypeAndSubscriberId(typr: string, subscriberId: number): Promise<Currency | AppError>;
}