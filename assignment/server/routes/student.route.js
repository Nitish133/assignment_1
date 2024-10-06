import express from "express";
import { create, edit, remove, userdetails, getAllUsers } from "../controller/student.controller.js";

const router = express.Router();

router.post("/create", create); // Create student
router.put("/edit/:id", edit);  // Edit student
router.delete("/delete/:id", remove); // Delete student
router.get("/details/:id", userdetails); // Get student details
router.get("/students", getAllUsers); // Get all students

export default router;
