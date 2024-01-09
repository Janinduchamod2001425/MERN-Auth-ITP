import express from "express";
import { authSeller, registerSeller, logoutSeller, getSellerProfile, updateSellerProfile } from "../controllers/sellerController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', registerSeller);
router.post('/auth', authSeller);
router.post('/logout', logoutSeller);
router.route('/profile').get(protect, getSellerProfile).put(protect, updateSellerProfile);

export default router; 