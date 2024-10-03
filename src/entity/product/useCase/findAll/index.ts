import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";
import { Controller } from "./Controller";
import { UseCase } from "./UseCase";

const addressRepository = new InDatabaseProductRepository();
const useCase = new UseCase(addressRepository);
const controller = new Controller(useCase);

export { controller as findAllProductsController };