const crypto = require('crypto');
const PrivateRequest = require('../models/PrivateRequest');
const User = require('../models/User');
const Notification = require('../models/Notification');
const {encrypt, decrypt}= require("../utils/encryption");
// Encryption configuration

const createNotification = async (userId, message, type) => {
  const encryptedMessage = encrypt(message);
  const notification = new Notification({
    user: userId,
    message: encryptedMessage,
    type
  });
  await notification.save();
  io.to(userId).emit('receiveNotification', {
    message: encryptedMessage,
    type
  });
};

exports.createPrivateRequest = async (requesterId, fulfillerId, subject, classDate, startTime, duration, initialOffer) => {
  const requester = await User.findById(requesterId);
  if (requester.honorScore < 80) {
    throw new Error('Your honor score is too low to create a private request.');
  }

  const fulfiller = await User.findById(fulfillerId);
  if (!fulfiller) {
    throw new Error('Fulfiller not found.');
  }

  const classStartTime = new Date(classDate);
  classStartTime.setHours(...startTime.split(':').map(Number));

  const encryptedOffer = encrypt(initialOffer.toString());

  const newRequest = new PrivateRequest({
    requester: requesterId,
    fulfiller: fulfillerId,
    subject,
    classDate,
    startTime: classStartTime,
    duration,
    initialOffer: encryptedOffer,
    isCompleted: false
  });

  await newRequest.save();

  await createNotification(fulfillerId, 'You have a new private request.', 'newRequest');

  return newRequest;
};

exports.negotiatePrivateRequest = async (requestId, fulfillerId, newOffer) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'pending') throw new Error('Not authorized to negotiate this request.');

  const encryptedOffer = encrypt(newOffer.toString());

  request.negotiatedPrice = encryptedOffer;
  request.status = 'negotiation';
  await request.save();

  await createNotification(request.requester, 'Your request is under negotiation.', 'negotiation');

  return request;
};

exports.acceptNegotiation = async (requestId, requesterId) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'negotiation') throw new Error('Request is not under negotiation.');

  request.status = 'accepted';
  await request.save();

  await createNotification(request.fulfiller, 'Your negotiation has been accepted.', 'acceptNegotiation');

  return request;
};

exports.declineNegotiation = async (requestId, requesterId) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'negotiation') throw new Error('Request is not under negotiation.');

  request.status = 'declined';
  await request.save();

  await createNotification(request.fulfiller, 'Your negotiation has been declined.', 'declineNegotiation');

  return request;
};

exports.acceptPrivateRequest = async (requestId) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'pending' && request.status !== 'negotiation') {
    throw new Error('Request cannot be accepted in its current state.');
  }

  request.status = 'accepted';
  await request.save();

  await createNotification(request.requester, 'Your request has been accepted.', 'accept');

  return request;
};

exports.declinePrivateRequest = async (requestId) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'pending' && request.status !== 'negotiation') {
    throw new Error('Request cannot be declined in its current state.');
  }

  request.status = 'declined';
  await request.save();

  await createNotification(request.requester, 'Your request has been declined.', 'decline');

  return request;
};

exports.completePrivateRequest = async (requestId, isCompleted) => {
  const request = await PrivateRequest.findById(requestId);
  if (!request) throw new Error('Private request not found.');

  if (request.status !== 'accepted') throw new Error('Only accepted requests can be marked as completed.');

  request.isCompleted = isCompleted;
  await request.save();

  const fulfiller = await User.findById(request.fulfiller);
  const requester = await User.findById(request.requester);

  if (!fulfiller || !requester) {
    throw new Error('Fulfiller or requester not found.');
  }

  if (isCompleted) {
    const finalPrice = parseFloat(decrypt(request.negotiatedPrice));
    fulfiller.swaps += finalPrice;
    requester.swaps -= finalPrice;

    fulfiller.honorScore += 5;
    requester.honorScore += 2;

    await fulfiller.save();
    await requester.save();
  } else {
    fulfiller.honorScore -= 10;
    await fulfiller.save();
  }

  await createNotification(request.fulfiller, 'Request has been completed.', 'complete');
  await createNotification(request.requester, 'Your request has been completed.', 'complete');

  return request;
};
