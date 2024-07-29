import React, { useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function EditModal({ showModal, closeModal, userData }) {
  const token = useSelector(state => state.usermanage.token);
  const [formData, setFormData] = useState({
    id: userData.id,
    email: userData.email,
    username: userData.username,
    phone: userData.phone,
    first_name: userData.first_name,
    last_name: userData.last_name,
    // is_active: userData.is_active,
    is_superuser: userData.is_superuser,
    is_staff: userData.is_staff,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/${formData.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/admin/${formData.id}/`);
      console.log('User deleted:', response.data);
      closeModal(); // Close modal after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
                      <div className="mt-2">
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.first_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.last_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        {/* <div className="mb-4">
                          <label htmlFor="is_active" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <select
                            name="is_active"
                            id="is_active"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.is_active}
                            onChange={handleChange}
                          >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </div> */}
                        <div className="mb-4">
                          <label htmlFor="is_superuser" className="block text-sm font-medium text-gray-700">
                            Superuser
                          </label>
                          <select
                            name="is_superuser"
                            id="is_superuser"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.is_superuser}
                            onChange={handleChange}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="is_staff" className="block text-sm font-medium text-gray-700">
                            Staff
                          </label>
                          <select
                            name="is_staff"
                            id="is_staff"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.is_staff}
                            onChange={handleChange}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete User
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
