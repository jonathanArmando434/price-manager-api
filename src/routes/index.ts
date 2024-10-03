import { Router } from 'express'

import productRoutes from './ProductRouter';

const router = Router();

// router.get('/', (req, res) => {
//     return res.send('Price Manager API...');
// });

router.use('/products', productRoutes);

export default router