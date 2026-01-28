import express from 'express';
import { 
    getCategoryList, 
    createCategory, 
    editCategory, 
    deleteCategory 
} from '../controllers/CategoryController.js';
import verifyToken from '../middleware/auth.js'; 

const router = express.Router();

router.get('/', getCategoryList);

router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, editCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;