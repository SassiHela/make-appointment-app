const express = require("express");
const router = express.Router();
const {
  addAppointment,
  getAppointmentById,
  updateAppointmentToPaid,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, addAppointment);
router.route("/:id").get(protect, getAppointmentById);
router.route("/:id/pay").put(protect, updateAppointmentToPaid);

module.exports = router;
