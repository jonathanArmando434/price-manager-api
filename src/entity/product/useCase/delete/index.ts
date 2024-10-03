import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";
import { Controller } from "./Controller";
import { UseCase } from "./UseCase";

const productRepository = new InDatabaseProductRepository();
const useCase = new UseCase(productRepository);
const controller = new Controller(useCase);

export { controller as deleteProductController };