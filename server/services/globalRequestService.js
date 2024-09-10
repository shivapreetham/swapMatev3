const GlobalRequest = require('../models/GlobalRequest');
const User = require('../models/User');
const SwapTransaction = require("../models/SwapTransaction");

function parseTime(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

exports.createGlobalRequest = async (requesterId, subject, classDate, startTime, duration, minBid, maxBid) => {
  // Honor score check for making a request
  const requester = await User.findById(requesterId);
  if (requester.honorScore < 80) {
    throw new Error('Your honor score is too low to create a global request.');
  }

  // Convert startTime to 24-hour format
  const { hours, minutes } = parseTime(startTime);
  const classStartDate = new Date(`${classDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00Z`);

  // Calculate bid end time ensuring it's at least 1 hour before class start
  const bidEndTime = new Date(classStartDate.getTime() - 60 * 60 * 1000); // Minimum bid end time is 1 hour before class start

  const newRequest = new GlobalRequest({
    requester: requesterId,
    subject,
    classDate,
    startTime: classStartDate,
    duration,
    minBid,
    maxBid,
    bidEndTime,
    bids: [],
    isCompleted: false
  });

  await newRequest.save();
  return newRequest;
};

exports.placeBid = async (requestId, fulfillerId, bidPrice) => {
  const request = await GlobalRequest.findById(requestId);

  // Check if bidding is still allowed
  if (new Date() > request.bidEndTime) {
    throw new Error('Bidding period has ended.');
  }

  // Honor score check for fulfilling a request
  const fulfiller = await User.findById(fulfillerId);
  if (fulfiller.honorScore < 90) {
    throw new Error('Your honor score is too low to place a bid.');
  }

  request.bids.push({ fulfiller: fulfillerId, bidPrice });
  await request.save();
  return request;
};

exports.selectBid = async (requestId, selectedBidId) => {
  const request = await GlobalRequest.findById(requestId);

  if (!request) {
    throw new Error('Global request not found.');
  }

  const now = new Date();
  const classTime = new Date(request.startTime);

  // Ensure selection is made before 15 minutes of class start
  if (now >= new Date(classTime - 15 * 60 * 1000)) {
    throw new Error('Cannot select a bid within 15 minutes of class start.');
  }

  request.selectedBid = selectedBidId;
  request.bidEndTime = now; // End bidding immediately
  await request.save();
  return request;
};

exports.completeRequest = async (requestId, isCompleted) => {
  const request = await GlobalRequest.findById(requestId);

  if (!request) {
    throw new Error('Global request not found.');
  }

  if (!request.selectedBid) {
    throw new Error('No selected bid for this request.');
  }

  const fulfiller = await User.findById(request.selectedBid.fulfilledBy);
  const requester = await User.findById(request.requestedBy);

  if (!fulfiller || !requester) {
    throw new Error('Fulfiller or requester not found.');
  }

  // Update the request's completion status
  request.isCompleted = isCompleted;
  await request.save();

  if (isCompleted) {
    // Process swaps (currency) transaction
    fulfiller.swaps += request.selectedBid.bidPrice;
    requester.swaps -= request.selectedBid.bidPrice;

    // Create a swap transaction record
    await SwapTransaction.create({
      requestId: request._id,
      requesterId: requester._id,
      fulfillerId: fulfiller._id,
      amount: request.selectedBid.bidPrice,
      status: 'completed'
    });

    // Update honor scores
    fulfiller.honorScore += 5; // Increase fulfiller's honor score for successfully completing the request
    requester.honorScore += 2; // Increase requester's honor score for successful interaction

    await fulfiller.save();
    await requester.save();
  } else {
    // Handle incomplete requests
    fulfiller.honorScore -= 10; // Decrease fulfiller's honor score for failing the request
    await fulfiller.save();
  }

  return request;
};
