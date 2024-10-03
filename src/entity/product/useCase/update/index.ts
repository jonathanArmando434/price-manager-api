import { Controller } from "./Controller"
import { UseCase } from "./UseCase";
import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";

const productRepository = new InDatabaseProductRepository();
const useCase = new UseCase(productRepository);
const controller = new Controller(useCase);

export { controller as updateProductController };