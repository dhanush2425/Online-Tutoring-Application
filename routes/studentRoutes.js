const { Router } = require("express");
const studentController = require("../controller/studentController");


const router = Router();

router.get('/student', studentController.getAllStudents);
router.get('/student/:id', studentController.getAStudent);
router.put('/student/:id', studentController.updateStudent);

module.exports=router;