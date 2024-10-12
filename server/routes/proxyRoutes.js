const express = require('express');
const router = express.Router();
const GlobalRequestController = require('../controllers/GlobalRequestController');
const PrivateRequestController = require('../controllers/PrivateRequestController');
const protect = require('../middlewares/authMiddleware');

// Apply protect to all routes in this router
router.use(protect);

// Global Request Routes
router.post('/global/create', GlobalRequestController.createGlobalRequest);
router.post('/global/bid', GlobalRequestController.placeBid);
router.post('/global/select', GlobalRequestController.selectBid);
router.post('/global/complete', GlobalRequestController.completeRequest);

// Private Request Routes
router.post('/private/create', PrivateRequestController.createPrivateRequest);
router.post('/private/negotiate', PrivateRequestController.negotiatePrivateRequest);
router.post('/private/accept', PrivateRequestController.acceptPrivateRequest);
router.post('/private/decline', PrivateRequestController.declinePrivateRequest);
router.post('/private/complete', PrivateRequestController.completePrivateRequest);

module.exports = router;
