const express = require('express');
const router = express.Router();
const GlobalRequestController = require('../controllers/GlobalRequestController');
const PrivateRequestController = require('../controllers/PrivateRequestController');
const protect = require('../middlewares/authMiddleware');

// Global Request Routes
router.post('/global/create', protect, GlobalRequestController.createGlobalRequest);
router.post('/global/bid', protect, GlobalRequestController.placeBid);
router.post('/global/select', protect, GlobalRequestController.selectBid);
router.post('/global/complete', protect, GlobalRequestController.completeRequest);

// Private Request Routes
router.post('/private/create', protect, PrivateRequestController.createPrivateRequest);
router.post('/private/negotiate', protect, PrivateRequestController.negotiatePrivateRequest);
router.post('/private/accept', protect, PrivateRequestController.acceptPrivateRequest);
router.post('/private/decline', protect, PrivateRequestController.declinePrivateRequest);
router.post('/private/complete', protect, PrivateRequestController.completePrivateRequest);

module.exports = router;
