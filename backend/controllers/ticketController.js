const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc     Get user tickets
// @route    GET /api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
  //authMiddleware je već odadio svoje i req.user.id sadrži userov id iz JWT tokena
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //tražimo tickete od usera
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc     Get single user ticket
// @route    GET /api/tickets/:id
// @access   Private
const getTicket = asyncHandler(async (req, res) => {
  //authMiddleware je već odadio svoje i req.user.id sadrži userov id iz JWT tokena
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //tražimo tickete od usera
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

// @desc     Create new ticket
// @route    POST /api/tickets
// @access   Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body; //status ne postavlja user, a po defaultu je "new"

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  //authMiddleware je već odadio svoje i req.user.id sadrži userov id iz JWT tokena
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

// @desc     Delete ticket
// @route    DELETE /api/tickets/:id
// @access   Private
const deleteTicket = asyncHandler(async (req, res) => {
  //authMiddleware je već odadio svoje i req.user.id sadrži userov id iz JWT tokena
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //tražimo tickete od usera
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc     Update ticket
// @route    PUT /api/tickets/:id
// @access   Private
const updateTicket = asyncHandler(async (req, res) => {
  //authMiddleware je već odadio svoje i req.user.id sadrži userov id iz JWT tokena
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //tražimo tickete od usera
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id, //id
    req.body, //novi podaci
    { new: true } //Ako već nije tu ticket - kreiraj ga
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
