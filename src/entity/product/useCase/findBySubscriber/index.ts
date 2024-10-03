import { InDatabaseSubscriberRepository } from "../../../subscriber/repository/implementation/InDatabaseSubscriberRepository";
import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";
import { Controller } from "./Controller";
import { UseCase } from "./UseCase";

const subscriberRepository = new InDatabaseSubscriberRepository();
const productRepository = new InDatabaseProductRepository();
const useCase = new UseCase(subscriberRepository, productRepository);
const controller = new Controller(useCase);

export { controller as findProductBySubscriber };