import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: ""
    });
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: ""
    });

    
    useEffect(() => {
        axios.get("http://localhost:5000/student/students") 
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
    const handleNewUserChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    
    const handleEdit = (user) => {
        setEditUser(user._id);
        setFormData(user); 
    };

   
    const handleSave = () => {
        axios.put(`http://localhost:5000/student/edit/${editUser}`, formData)
            .then(response => {
                setUsers(users.map(user => (user._id === editUser ? response.data : user)));
                setEditUser(null); // Exit edit mode
            })
            .catch(error => console.error("Error updating user:", error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/student/delete/${id}`)
            .then(() => setUsers(users.filter(user => user._id !== id)))
            .catch(error => console.error("Error deleting user:", error));
    };

   
    const handleCreate = () => {
        axios.post("http://localhost:5000/student/create", newUserData)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUserData({ name: "", email: "", phone: "", age: "", gender: "" }); // Clear form
            })
            .catch(error => console.error("Error creating user:", error));
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">User List</h2>

          
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Age</th>
                        <th className="py-2">Gender</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className="border px-4 py-2">{user.age}</td>
                            <td className="border px-4 py-2">{user.gender}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded ml-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          
            {editUser && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-4">Edit User</h3>
                    {/* Form for editing user */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Save Changes
                    </button>
                </div>
            )}

            {/* Create New User Section */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Create New User</h3>
                {/* Form for creating new user */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newUserData.name}
                        onChange={handleNewUserChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={newUserData.email}
                        onChange={handleNewUserChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={newUserData.phone}
                        onChange={handleNewUserChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={newUserData.age}
                        onChange={handleNewUserChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={newUserData.gender}
                        onChange={handleNewUserChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Create User
                </button>
            </div>
        </div>
    );
};

export default UserList;
