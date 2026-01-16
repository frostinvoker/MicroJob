import { Router } from 'express';
import {
    register,
    login,
    logout,
} from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', auth, login);
router.post('/logout', logout);

export default router;