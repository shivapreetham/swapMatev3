// controllers/PrivateRequestController.js

const PrivateRequestService = require('../services/privateRequestService');

exports.createPrivateRequest = async (req, res) => {
  try {
    const { fulfillerId, subject, classDate, startTime, duration, initialOffer } = req.body;
    const requesterId = req.user.id; 
    const privateRequest = await PrivateRequestService.createPrivateRequest(requesterId, fulfillerId, subject, classDate, startTime, duration, initialOffer);
    res.status(201).json(privateRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating private request', error: error.message });
  }
};

exports.negotiatePrivateRequest = async (req, res) => {
  try {
    const { requestId, newOffer } = req.body;

    const updatedRequest = await PrivateRequestService.negotiatePrivateRequest(requestId, newOffer);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error negotiating private request', error: error.message });
  }
};

exports.acceptNegotiation = async (req, res) => {
  try {
    const { requestId } = req.body;

    const acceptedRequest = await PrivateRequestService.acceptNegotiation(requestId);
    res.status(200).json(acceptedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting negotiation', error: error.message });
  }
};

exports.declineNegotiation = async (req, res) => {
  try {
    const { requestId } = req.body;

    const declinedRequest = await PrivateRequestService.declineNegotiation(requestId);
    res.status(200).json(declinedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error declining negotiation', error: error.message });
  }
};

exports.acceptPrivateRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const acceptedRequest = await PrivateRequestService.acceptPrivateRequest(requestId);
    res.status(200).json(acceptedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting private request', error: error.message });
  }
};

exports.declinePrivateRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const declinedRequest = await PrivateRequestService.declinePrivateRequest(requestId);
    res.status(200).json(declinedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error declining private request', error: error.message });
  }
};

exports.completePrivateRequest = async (req, res) => {
  try {
    const { requestId, isCompleted } = req.body;

    const completedRequest = await PrivateRequestService.completePrivateRequest(requestId, isCompleted);
    res.status(200).json(completedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error completing private request', error: error.message });
  }
};
