import { Controller } from "./Controller"
import { UseCase } from "./UseCase";
import { InDatabaseSubscriberRepository } from "../../../subscriber/repository/implementation/InDatabaseSubscriberRepository";
import { InDatabaseCurrencyRepository } from "../../../currency/repository/implementation/InDatabaseCurrencyRepository";
import { InDatabaseProductRepository } from "../../repository/implementation/InDatabaseProductRepository";

const subscriberRepository = new InDatabaseSubscriberRepository();
const productRepository = new InDatabaseProductRepository();
const currencyRepository = new InDatabaseCurrencyRepository();
const useCase = new UseCase(subscriberRepository, currencyRepository, productRepository);
const controller = new Controller(useCase);

export { controller as updatePricesByCurrencyController };