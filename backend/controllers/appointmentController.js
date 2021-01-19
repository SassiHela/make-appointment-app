const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");

// @desc   Create new appointment
// @route  POST /api/appointment
// @access Private
const addAppointment = asyncHandler(async (req, res) => {
  const { appointmentDate, address, paymentMethod, price } = req.body;

  const appointment = new Appointment({
    user: req.user._id,
    appointmentDate,
    address,
    paymentMethod,
    price,
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

// @desc   Get an appointment by ID
// @route  Get /api/appointment/:id
// @access Private
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (appointment) res.json(appointment);
  else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc   Update appointment to paid
// @route  PUT /api/appointment/:id/pay
// @access Private
const updateAppointmentToPaid = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.isPaid = true;
    appointment.paidAt = Date.now();

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

module.exports = {
  addAppointment,
  getAppointmentById,
  updateAppointmentToPaid,
};
