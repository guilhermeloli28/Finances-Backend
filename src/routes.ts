import { Router } from 'express';
import { CustomerController } from './controllers/CustomerController';
import { StatmentController } from './controllers/StatmentController';
import { CustomerMiddleware } from './middlewares/CustomerMiddleware';

const router = Router();

const customerController = new CustomerController();
const statmentController = new StatmentController();
const customerMiddleware = new CustomerMiddleware();

router.post('/account', customerController.create);
router.get('/account', customerController.index);
router.put('/account', customerMiddleware.verifyIfExisitsAccountCPF, customerController.update);
router.delete('/account', customerMiddleware.verifyIfExisitsAccountCPF, customerController.delete);
router.get("/balance", customerMiddleware.verifyIfExisitsAccountCPF, customerController.balance);

router.post('/deposit', customerMiddleware.verifyIfExisitsAccountCPF, statmentController.create);
router.post('/withdraw', customerMiddleware.verifyIfExisitsAccountCPF, statmentController.create);
router.get('/statment', customerMiddleware.verifyIfExisitsAccountCPF, statmentController.index);
router.get("/statment/date", customerMiddleware.verifyIfExisitsAccountCPF, statmentController.findByDate);

export { router };
