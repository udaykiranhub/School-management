import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mycon } from '../../../store/Mycontext';
import { Pencil, Trash2, Phone, MapPin, User, Users } from 'lucide-react';
import Allapi from '../../../common';
const backapi = "http://localhost:3490";

const ViewEnquiry = () => {
  const { branchdet } = useContext(mycon);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [uniqueTowns, setUniqueTowns] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  
  // Filter states
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!branchdet?.academicYears?.[0]) return;

      try {
        setLoading(true);
        const [teachersResponse, enquiriesResponse] = await Promise.all([
          fetch(Allapi.getTeachers.url(branchdet.academicYears[0]), {
            method: Allapi.getTeachers.method,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(Allapi.getEnquiries.url(branchdet._id), {
            method: Allapi.getEnquiries.method,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const [teachersResult, enquiriesResult] = await Promise.all([
          teachersResponse.json(),
          enquiriesResponse.json()
        ]);

        if (teachersResult.success) {
          setTeachers(teachersResult.data.sort((a, b) => a.name.localeCompare(b.name)));
        }

        if (enquiriesResult.success) {
          const towns = [...new Set(enquiriesResult.data.map(enquiry => enquiry.town))];
          setUniqueTowns(towns.sort());
        }
      } catch (error) {
        toast.error('Error fetching initial data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [branchdet]);

  useEffect(() => {
    const fetchFilteredEnquiries = async () => {
      if (!selectedTown || !selectedTeacher || !branchdet?._id) return;

      try {
        setLoading(true);
        const response = await fetch(
          Allapi.getEnquiries.url(branchdet._id),
          {
            method: Allapi.getEnquiries.method,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const result = await response.json();
        if (result.success) {
          const filteredData = result.data.filter(enquiry => 
            enquiry.town === selectedTown && 
            enquiry.reference === selectedTeacher
          );
          setEnquiries(filteredData);
        }
      } catch (error) {
        toast.error('Error fetching enquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredEnquiries();
  }, [selectedTown, selectedTeacher, branchdet]);

  const handleStatusUpdate = async (enquiryId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${Allapi.updateEnquiryStatus.url(enquiryId)}`,
        {
          method: Allapi.updateEnquiryStatus.method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success('Status updated successfully');
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enquiry =>
            enquiry._id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
          )
        );
      } else {
        throw new Error(result.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (enquiryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${backapi}/api/enquiry/${enquiryId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success('Enquiry deleted successfully');
        setEnquiries(prevEnquiries => 
          prevEnquiries.filter(enquiry => enquiry._id !== enquiryId)
        );
      } else {
        throw new Error(result.message || 'Failed to delete enquiry');
      }
    } catch (error) {
      toast.error(error.message || 'Error deleting enquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (enquiryId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backapi}/api/enquiry/${enquiryId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();
      if (result.success) {
        setEditingEnquiry(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch enquiry details');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching enquiry details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (enquiryId, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backapi}/api/enquiry/${enquiryId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success('Enquiry updated successfully');
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enquiry =>
            enquiry._id === enquiryId ? { ...enquiry, ...updatedData } : enquiry
          )
        );
        setEditingEnquiry(null);
      } else {
        throw new Error(result.message || 'Failed to update enquiry');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating enquiry');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 ring-rose-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 sm:mb-0">
            View Enquiries
          </h1>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow-lg rounded-xl mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-indigo-600 mb-2">
                Select Town
              </label>
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all duration-200"
              >
                <option value="">Select Town</option>
                {uniqueTowns.map((town) => (
                  <option key={town} value={town}>{town}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-indigo-600 mb-2">
                Select Reference Teacher
              </label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all duration-200"
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="flex items-center justify-center text-indigo-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
                <span className="ml-2">Loading enquiries...</span>
              </div>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              {selectedTown && selectedTeacher 
                ? 'No enquiries found for selected filters'
                : 'Please select both town and reference teacher to view enquiries'}
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <div key={enquiry._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {enquiry.studentName}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <Users className="h-4 w-4" />
                            Father: {enquiry.fatherName}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-gray-600 flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {enquiry.phoneNo}
                            </p>
                            <p className="text-gray-600 flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {enquiry.town}, {enquiry.street}, {enquiry.street2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Class & Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Class:</span>
                        <p className="font-medium text-gray-900">{enquiry.class?.name} - {enquiry.section?.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadgeClass(enquiry.status)}`}>
                          {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                        className="rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={loading}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                      
                      <button
                        onClick={() => handleEdit(enquiry._id)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Edit"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(enquiry._id)}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;