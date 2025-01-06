
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import Allapi from '../../../common';

const EditPortfolio = () => {
    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    const [editFormData, setEditFormData] = useState({
        username: '',
        password: '',
        qualification: '',
        experience: '',
        address: {
            doorNo: '',
            street: '',
            city: '',
            pincode: '',
        }
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!decoded?.id) {
            toast.error('Authentication required');
            return;
        }

        try {
            setIsLoading(true);
            // Only include fields that have values
            const updateData = {
                academic_id: decoded?.academic_id
            };

            // Only add fields that have values
            if (editFormData.username) updateData.username = editFormData.username;
            if (editFormData.password) updateData.password = editFormData.password;
            if (editFormData.qualification) updateData.qualification = editFormData.qualification;
            if (editFormData.experience) updateData.experience = editFormData.experience;

            // Only add address if at least one field is filled
            const hasAddressData = Object.values(editFormData.address).some(value => value);
            if (hasAddressData) {
                updateData.address = {};
                Object.entries(editFormData.address).forEach(([key, value]) => {
                    if (value) updateData.address[key] = value;
                });
            }

            const response = await fetch(
                Allapi.updateTeacher.url(decoded.id),
                {
                    method: Allapi.updateTeacher.method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            if (result.success) {
                toast.success('Profile updated successfully');
            } else {
                toast.error(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Error updating profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setEditFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setEditFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    if (!decoded?.id) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-red-600">Please login to access this page</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editFormData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password (leave blank to keep current)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={editFormData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Qualification
                                </label>
                                <input
                                    type="text"
                                    name="qualification"
                                    value={editFormData.qualification}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience (years)
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={editFormData.experience}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="address.doorNo"
                                        value={editFormData.address.doorNo}
                                        onChange={handleInputChange}
                                        placeholder="Door No"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={editFormData.address.street}
                                        onChange={handleInputChange}
                                        placeholder="Street"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={editFormData.address.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="address.pincode"
                                        value={editFormData.address.pincode}
                                        onChange={handleInputChange}
                                        placeholder="Pincode"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPortfolio;