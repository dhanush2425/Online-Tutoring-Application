const { Router } = require("express");
const tutorController = require("../controller/tutorController");


const router = Router();

router.get('/tutor', tutorController.getAllTutors);
router.delete('/tutor/:id', tutorController.deleteTutor);
router.get('/tutor/:id', tutorController.getATutor);
router.put('/tutor/:id', tutorController.updateTutor);

module.exports=router;