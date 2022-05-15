const { Router } = require("express");
const appointmentController = require("../controller/appointmentController")

const router = Router();

router.get("/appointment", appointmentController.getAllAppointments);
router.get("/appointment/:id", appointmentController.getAnAppointment);
router.get("/appointment/tutor/:id", appointmentController.getAllTutorAppointments);
router.get("/appointment/student/:id", appointmentController.getAllStudentAppointments);
router.get("/appointment/tutor/date/time", appointmentController.getTutorsTimeSpecificAppointments);
router.post("/appointment", appointmentController.makeAnAppointment);
router.delete("/appointment/:id", appointmentController.removeAnAppointment);
router.put("/appointment/:id", appointmentController.updateAnAppointment);

module.exports = router;
