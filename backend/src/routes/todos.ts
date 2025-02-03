import { Router } from 'express';
import { TodoController } from '../controllers';
import { EnsureIsAunthenticated } from '../middleware/auth';


const router = Router();
// @ts-ignore/
router.use( EnsureIsAunthenticated);
router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;