import { AppError } from "../../../shared/AppError";
import { Product } from "../Product";

export interface ProductRepository {
  save(product: Product): Promise<Product | AppError>;
  find(id: number): Promise<Product | AppError>;
  findAll(): Promise<Product[] | AppError>;
  findBySubscriber(subscriberId: number): Promise<Product[] | AppError>;
  update(id: number, product: Product): Promise<Product | AppError>
  updatePricesByCurrency(currencyId: number, exchange: number, subscriberId: number): Promise<number | AppError>;
  delete(id: number): Promise<Product | AppError>;
}