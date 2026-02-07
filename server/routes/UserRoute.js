import { Router } from 'express';
import {
    register,
    login,
    logout,
    getUserList,
    sendOtp,
    verifyOtp,
} from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/userlist', getUserList);
router.post('/otp/send', sendOtp);
router.post('/otp/verify', verifyOtp);


export default router;