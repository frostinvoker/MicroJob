import { Router } from 'express';
import {
    register,
    verifyPhone,
    login,
    logout,
    getUserList,
} from '../controllers/UserController.js';
import auth from '../middleware/auth.js';
import { verifyFirebaseToken} from '../middleware/firebaseAuth.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/userlist', getUserList);
router.post('/verify-phone', verifyFirebaseToken, verifyPhone);

export default router;