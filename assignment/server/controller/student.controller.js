import { studentModel } from "../model/student.model.js";


const create = async (req, res) => {
    const { name, email, phone, age, gender } = req.body;

    try {
    
        const newUser = new studentModel({
            name,
            email,
            phone,
            age,
            gender
        });


        const result = await newUser.save();
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        console.log(error)
        res.status(500).json({ message: "Failed to create user", error });
    }
};


const edit = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, age, gender } = req.body;

    try {

        const updatedUser = await studentModel.findByIdAndUpdate(
            id,
            { name, email, phone, age, gender },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Failed to update student", error });
    }
};


const remove = async (req, res) => {
    const { id } = req.params;

    try {
        
        const deletedUser = await studentModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Failed to delete student", error });
    }
};

// Get student details
const userdetails = async (req, res) => {
    const { id } = req.params;

    try {
        
        const student = await studentModel.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).json({ message: "Failed to fetch student details", error });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const students = await studentModel.find();  // Fetch all students
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Failed to fetch students", error });
    }
};



export { create, edit, remove, userdetails ,getAllUsers};
