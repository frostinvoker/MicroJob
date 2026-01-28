import { Router } from 'express';
import {
    register,
    login,
    logout,
    getUserList,
} from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/userlist', getUserList);


export default router;