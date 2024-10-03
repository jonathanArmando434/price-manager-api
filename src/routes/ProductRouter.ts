import { Router } from "express";
import { saveProductController } from "../entity/product/useCase/save";
import { updatePricesByCurrencyController } from "../entity/product/useCase/updatePricesByCurrency";
import { findAllProductsController } from "../entity/product/useCase/findAll";
import { findProductController } from "../entity/product/useCase/find";
import { findProductBySubscriber } from "../entity/product/useCase/findBySubscriber";
import { updateProductController } from "../entity/product/useCase/update";
import { deleteProductController } from "../entity/product/useCase/delete";

const productRouter = Router();

productRouter.post('/:subscriber', (req, res) => {
    saveProductController.handle(req, res);
});

productRouter.get('/', (req, res) => {
    findProductController.handle(req, res);
});

// productRouter.get('/', (req, res) => {
//     findAllProductsController.handle(req, res);
// });

productRouter.get('/:subscriber', (req, res) => {
    findProductBySubscriber.handle(req, res);
});

productRouter.put('/:subscriber', (req, res) => {
    updatePricesByCurrencyController.handle(req, res);
});

productRouter.put('/', (req, res) => {
    updateProductController.handle(req, res);
});

productRouter.delete('/', (req, res) => {
    deleteProductController.handle(req, res);
});

export default productRouter;