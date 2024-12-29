import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mycon } from '../../../store/Mycontext';
import { User, Users, Phone, MapPin } from 'lucide-react';
import Allapi from '../../../common';

const ViewEnquiry = () => {
  const { branchdet } = useContext(mycon);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [uniqueTowns, setUniqueTowns] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [filterType, setFilterType] = useState(''); // 'town' or 'teacher'
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Fetch initial data (teachers and towns)
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!branchdet?.academicYears?.[0]) return;

      try {
        setLoading(true);
        // Fetch teachers
        const teachersResponse = await fetch(Allapi.getTeachers.url(branchdet.academicYears[0]), {
          method: Allapi.getTeachers.method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        // Fetch all enquiries to get unique towns
        const enquiriesResponse = await fetch(Allapi.getEnquiries.url(branchdet._id), {
          method: Allapi.getEnquiries.method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

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

  // Fetch filtered enquiries based on selection
  useEffect(() => {
    const fetchFilteredEnquiries = async () => {
      if (!filterType || (!selectedTown && !selectedTeacher) || !branchdet?._id) return;

      try {
        setLoading(true);
        const response = await fetch(Allapi.getEnquiries.url(branchdet._id), {
          method: Allapi.getEnquiries.method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (result.success) {
          let filteredData = result.data;
          
          if (filterType === 'town' && selectedTown) {
            filteredData = filteredData.filter(enquiry => enquiry.town === selectedTown);
          } else if (filterType === 'teacher' && selectedTeacher) {
            filteredData = filteredData.filter(enquiry => enquiry.reference === selectedTeacher);
          }
          
          setEnquiries(filteredData);
        }
      } catch (error) {
        toast.error('Error fetching enquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredEnquiries();
  }, [filterType, selectedTown, selectedTeacher, branchdet]);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setSelectedTown('');
    setSelectedTeacher('');
    setEnquiries([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 sm:mb-0">
            View Student Details
          </h1>
        </div>
        
        {/* Filter Selection */}
        <div className="bg-white shadow-lg rounded-xl mb-8 p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-indigo-600 mb-2">
              Filter By
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleFilterTypeChange('town')}
                className={`px-4 py-2 rounded-lg ${
                  filterType === 'town'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                Town
              </button>
              <button
                onClick={() => handleFilterTypeChange('teacher')}
                className={`px-4 py-2 rounded-lg ${
                  filterType === 'teacher'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                Reference Teacher
              </button>
            </div>
          </div>

          {filterType === 'town' && (
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
          )}

          {filterType === 'teacher' && (
            <div >
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
          )}
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="flex items-center justify-center text-indigo-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
                <span className="ml-2">Loading students...</span>
              </div>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              {filterType 
                ? 'No students found for selected filter'
                : 'Please select a filter type to view students'}
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

                    {/* Class Info */}
                    <div>
                      <span className="text-sm text-gray-500">Class:</span>
                      <p className="font-medium text-gray-900">{enquiry.class?.name} - {enquiry.section?.name}</p>
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