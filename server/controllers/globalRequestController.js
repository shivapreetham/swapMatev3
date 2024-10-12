const GlobalRequestService = require('../services/globalRequestService');

exports.createGlobalRequest = async (req, res) => {
  try {
    const { subject, classDate, startTime, duration, minBid, maxBid, bidDuration } = req.body;
    const requesterId = req.user.id;
    console.log(requesterId)
    console.log('Creating global request with:', { requesterId, subject, classDate, startTime, duration, minBid, maxBid, bidDuration });
    const globalRequest = await GlobalRequestService.createGlobalRequest(requesterId, subject, classDate, startTime, duration, minBid, maxBid, bidDuration);
    res.status(201).json(globalRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating global request', error: error.message });
  }
};


exports.placeBid = async (req, res) => {
  try {
    const { requestId, bidPrice } = req.body;
    const fulfillerId = req.user.id;
    const updatedRequest = await GlobalRequestService.placeBid(requestId, fulfillerId, bidPrice);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error: error.message });
  }
};

exports.selectBid = async (req, res) => {
  try {
    const { requestId, selectedBidId } = req.body;
    const updatedRequest = await GlobalRequestService.selectBid(requestId, selectedBidId);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error selecting bid', error: error.message });
  }
};

exports.completeRequest = async (req, res) => {
  try {
    const { requestId, isCompleted } = req.body;
    const updatedRequest = await GlobalRequestService.completeRequest(requestId, isCompleted);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error completing request', error: error.message });
  }
};
