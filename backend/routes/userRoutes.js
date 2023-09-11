import express from 'express';
import { authUser,
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
    getUserDungeon
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/dungeon')
    .get(protect, getUserDungeon);

export default router;