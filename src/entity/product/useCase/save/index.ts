import { Controller } from "./Controller"
import { UseCase } from "./UseCase";
import { InDatabaseSubscriberRepository } from "../../../subscriber/repository/implementation/InDatabaseSubscriberRepository";
import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";

const subscriberRepository = new InDatabaseSubscriberRepository();
const productRepository = new InDatabaseProductRepository();
const useCase = new UseCase(subscriberRepository, productRepository);
const controller = new Controller(useCase);

export { controller as saveProductController };