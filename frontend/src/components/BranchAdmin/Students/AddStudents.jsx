// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// // import axios from "axios";

// const AddStudents = () => {
//   const [formData, setFormData] = useState({
//     idNo: "",
//     admissionNo: "",
//     surname: "",
//     name: "",
//     gender: "",
//     class: "",
//     section: "",
//     dob: "",
//     admissionDate: "",
//     photo: "",
//     aadharNo: "",
//     studentAAPR: "",
//     caste: "",
//     subCaste: "",
//     fatherName: "",
//     fatherAadhar: "",
//     fatherOccupation: "",
//     motherName: "",
//     motherAadhar: "",
//     motherOccupation: "",
//     whatsappNo: "",
//     emergencyContact: "",
//     address: {
//       doorNo: "",
//       street: "",
//       city: "",
//       pincode: "",
//     },
//     transport: false,
//     transportDetails: {
//       town: "",
//       bus: "",
//       halt: "",
//     },
//     hostel: false,
//     hostelDetails: {
//       hostelFee: "",
//       terms: "",
//     },
//     feeDetails: [],
//     concession: {},
//   });

//   const [towns, setTowns] = useState([]);
//   const [buses, setBuses] = useState([]);
//   const [halts, setHalts] = useState([]);

//   const casteOptions = ["OC", "BC", "SC", "ST"];
//   const fatherOccupationOptions = ["Employee", "Business"];
//   const motherOccupationOptions = ["Housewife", "Employee"];

//   // Generates ID based on academic year and sequence order
//   const generateId = () => {
//     const currentYear = new Date().getFullYear();
//     const id = `${currentYear % 100}${String(
//       Math.floor(Math.random() * 1000)
//     ).padStart(4, "0")}`;
//     setFormData((prev) => ({ ...prev, idNo: id }));
//   };

//   // Set default admission date as today's date
//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     setFormData((prev) => ({ ...prev, admissionDate: today }));
//   }, []);

//   // Handle Cloudinary file upload
//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_cloudinary_preset"); // Replace with actual Cloudinary preset

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//         formData
//       );
//       setFormData((prev) => ({ ...prev, photo: res.data.secure_url }));
//       toast.success("Photo uploaded successfully!");
//     } catch (error) {
//       toast.error("Photo upload failed");
//     }
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleTransportChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       transport: e.target.checked,
//     }));
//   };

//   const handleHostelChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       hostel: e.target.checked,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate and submit formData
//     console.log(formData);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-6">Add Student</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Student Basic Details */}
//           <div>
//             <label>ID No</label>
//             <input
//               type="text"
//               value={formData.idNo}
//               onChange={generateId}
//               readOnly
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Admission No</label>
//             <input
//               type="text"
//               name="admissionNo"
//               value={formData.admissionNo}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Surname</label>
//             <input
//               type="text"
//               name="surname"
//               value={formData.surname}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="input-field"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//           <div>
//             <label>Class</label>
//             <input
//               type="text"
//               name="class"
//               value={formData.class}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Section</label>
//             <input
//               type="text"
//               name="section"
//               value={formData.section}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Date of Birth</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label>Admission Date</label>
//             <input
//               type="date"
//               name="admissionDate"
//               value={formData.admissionDate}
//               onChange={handleChange}
//               className="input-field"
//               readOnly
//             />
//           </div>

//           {/* Upload Photo */}
//           <div>
//             <label>Upload Photo</label>
//             <input
//               type="file"
//               onChange={handlePhotoUpload}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Aadhar No</label>
//             <input
//               type="text"
//               name="aadharNo"
//               value={formData.aadharNo}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Student AAPR No</label>
//             <input
//               type="text"
//               name="studentAAPR"
//               value={formData.studentAAPR}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Caste</label>
//             <select
//               name="caste"
//               value={formData.caste}
//               onChange={handleChange}
//               className="input-field"
//             >
//               <option value="">Select Caste</option>
//               {casteOptions.map((caste) => (
//                 <option key={caste} value={caste}>
//                   {caste}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Sub Caste</label>
//             <input
//               type="text"
//               name="subCaste"
//               value={formData.subCaste}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           {/* Parent Details */}
//           <div>
//             <label>Father Name</label>
//             <input
//               type="text"
//               name="fatherName"
//               value={formData.fatherName}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Father Aadhar No</label>
//             <input
//               type="text"
//               name="fatherAadhar"
//               value={formData.fatherAadhar}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Father Occupation</label>
//             <select
//               name="fatherOccupation"
//               value={formData.fatherOccupation}
//               onChange={handleChange}
//               className="input-field"
//             >
//               {fatherOccupationOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Mother Name</label>
//             <input
//               type="text"
//               name="motherName"
//               value={formData.motherName}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Mother Aadhar No</label>
//             <input
//               type="text"
//               name="motherAadhar"
//               value={formData.motherAadhar}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Mother Occupation</label>
//             <select
//               name="motherOccupation"
//               value={formData.motherOccupation}
//               onChange={handleChange}
//               className="input-field"
//             >
//               {motherOccupationOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Whatsapp Mobile No</label>
//             <input
//               type="text"
//               name="whatsappNo"
//               value={formData.whatsappNo}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Emergency Contact No</label>
//             <input
//               type="text"
//               name="emergencyContact"
//               value={formData.emergencyContact}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label>Door No</label>
//             <input
//               type="text"
//               name="address.doorNo"
//               value={formData.address.doorNo}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Street</label>
//             <input
//               type="text"
//               name="address.street"
//               value={formData.address.street}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>City</label>
//             <input
//               type="text"
//               name="address.city"
//               value={formData.address.city}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <div>
//             <label>Pincode</label>
//             <input
//               type="text"
//               name="address.pincode"
//               value={formData.address.pincode}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           {/* Transport */}
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.transport}
//                 onChange={handleTransportChange}
//                 className="mr-2"
//               />
//               Require Transport?
//             </label>
//             {formData.transport && (
//               <div className="mt-4">
//                 <div>
//                   <label>Town</label>
//                   <select
//                     name="transportDetails.town"
//                     value={formData.transportDetails.town}
//                     onChange={handleChange}
//                     className="input-field"
//                   >
//                     <option value="">Select Town</option>
//                     {towns.map((town) => (
//                       <option key={town} value={town}>
//                         {town}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>Bus</label>
//                   <select
//                     name="transportDetails.bus"
//                     value={formData.transportDetails.bus}
//                     onChange={handleChange}
//                     className="input-field"
//                   >
//                     <option value="">Select Bus</option>
//                     {buses.map((bus) => (
//                       <option key={bus} value={bus}>
//                         {bus}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label>Halt</label>
//                   <select
//                     name="transportDetails.halt"
//                     value={formData.transportDetails.halt}
//                     onChange={handleChange}
//                     className="input-field"
//                   >
//                     <option value="">Select Halt</option>
//                     {halts.map((halt) => (
//                       <option key={halt} value={halt}>
//                         {halt}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Hostel */}
//           <div className="col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.hostel}
//                 onChange={handleHostelChange}
//                 className="mr-2"
//               />
//               Require Hostel?
//             </label>
//             {formData.hostel && (
//               <div className="mt-4">
//                 <div>
//                   <label>Hostel Fee</label>
//                   <input
//                     type="text"
//                     name="hostelDetails.hostelFee"
//                     value={formData.hostelDetails.hostelFee}
//                     onChange={handleChange}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label>Number of Terms</label>
//                   <input
//                     type="text"
//                     name="hostelDetails.terms"
//                     value={formData.hostelDetails.terms}
//                     onChange={handleChange}
//                     className="input-field"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Fee & Concession */}
//           <div className="col-span-2">
//             <h3 className="font-bold">Fee Details & Concession</h3>
//             {/* Dynamically list fee details here */}
//             {/* Add input for concession if applicable */}
//           </div>

//           <button type="submit" className="btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddStudents;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Allapi from "../../../common";
const backapi = "http://localhost:3490";

const AddStudents = () => {
  const [formData, setFormData] = useState({
    idNo: "",
    admissionNo: "",
    surname: "",
    name: "",
    gender: "",
    class: "",
    section: "",
    dob: "",
    admissionDate: "",
    photo: "",
    aadharNo: "",
    studentAAPR: "",
    caste: "",
    subCaste: "",
    fatherName: "",
    fatherAadhar: "",
    fatherOccupation: "",
    motherName: "",
    motherAadhar: "",
    motherOccupation: "",
    whatsappNo: "",
    emergencyContact: "",
    address: {
      doorNo: "",
      street: "",
      city: "",
      pincode: "",
    },
    transport: false,
    transportDetails: {
      town: "",
      bus: "",
      halt: "",
    },
    hostel: false,
    hostelDetails: {
      hostelFee: "",
      terms: "",
    },
    feeDetails: [],
    concession: {},
  });

  const [towns, setTowns] = useState([]);
  const [buses, setBuses] = useState([]);
  const [halts, setHalts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");

  const casteOptions = ["OC", "BC", "SC", "ST"];
  const fatherOccupationOptions = ["Employee", "Business"];
  const motherOccupationOptions = ["Housewife", "Employee"];

  // Generates ID based on the current academic year and sequence order
  const generateId = async () => {
    const yearSuffix = new Date().getFullYear().toString().slice(-2);
    const res = await fetch(
      `${backapi}/api/academic/view/${currentAcademicYear}`
    );
    const data = await res.json();
    const currentCount = data.length; // Assuming the API returns the number of students
    const id = `${yearSuffix}${String(currentCount).padStart(4, "0")}`;
    setFormData((prev) => ({ ...prev, idNo: id }));
  };

  // Fetch academic years on mount
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const res = await fetch(`${backapi}/api/academic/view/yourBranchId`); // Replace with actual branch ID
        const data = await res.json();
        setCurrentAcademicYear(data[0]); // Set current academic year
        await generateId(); // Generate ID based on academic year
      } catch (error) {
        console.error(error);
      }
    };
    fetchAcademicYears();
  }, []);

  // Fetch classes based on the current academic year
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${backapi}/api/classes/get-classes/${currentAcademicYear}`
        );
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentAcademicYear) fetchClasses();
  }, [currentAcademicYear]);

  // Fetch sections based on selected class
  useEffect(() => {
    const fetchSections = async () => {
      if (formData.class) {
        try {
          const res = await fetch(
            `${backapi}/api/sections/getall/${formData.class}/${currentAcademicYear}`
          );
          const data = await res.json();
          setSections(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchSections();
  }, [formData.class, currentAcademicYear]);

  // Fetch towns, buses, and halts based on transport selection
  const fetchTransportDetails = async () => {
    try {
      const townsRes = await fetch(
        `${backapi}/api/towns/alltowns/${currentAcademicYear}`
      );
      const townsData = await townsRes.json();
      setTowns(townsData);

      const busesRes = await fetch(
        `${backapi}/api/buses/allbuses/${currentAcademicYear}`
      ); // Adjust as needed
      const busesData = await busesRes.json();
      setBuses(busesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransportChange = async (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      transport: checked,
    }));
    if (checked) {
      await fetchTransportDetails();
    }
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setFormData((prev) => ({
      ...prev,
      class: selectedClass,
      section: "", // Reset section when class changes
    }));
  };

  const handleSectionChange = async (e) => {
    const selectedSection = e.target.value;
    setFormData((prev) => ({
      ...prev,
      section: selectedSection,
    }));
    // Fetch fees based on selected section
    const fetchFees = async () => {
      try {
        const res = await fetch(
          `${backapi}/api/Fee-types/allfeetype/${selectedSection}`
        );
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          feeDetails: data,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    await fetchFees();
  };

  // Handle Cloudinary file upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // Replace with actual Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, photo: data.secure_url }));
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error("Photo upload failed");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("transportDetails.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        transportDetails: {
          ...prev.transportDetails,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("hostelDetails.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        hostelDetails: {
          ...prev.hostelDetails,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate and submit formData
    console.log(formData);
    // Make sure to submit the formData to your API here
    try {
      const res = await fetch(`${backapi}/api/students/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Student added successfully!");
        setFormData({
          /* reset form data to initial state */
        });
      } else {
        const errorData = await res.json();
        toast.error(`Failed to add student: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while adding the student");
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Basic Details */}
            <div>
              <label className="block mb-1">ID No</label>
              <input
                type="text"
                value={formData.idNo}
                readOnly
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Admission No</label>
              <input
                type="text"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleClassChange}
                className="input-field w-full"
              >
                <option value="">Select Class</option>
                {classes.map((classItem) => (
                  <option key={classItem._id} value={classItem._id}>
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleSectionChange}
                className="input-field w-full"
              >
                <option value="">Select Section</option>
                {sections.map((sectionItem) => (
                  <option key={sectionItem._id} value={sectionItem._id}>
                    {sectionItem.sectionName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Aadhar No</label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Student AAPR</label>
              <input
                type="text"
                name="studentAAPR"
                value={formData.studentAAPR}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Caste</label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select Caste</option>
                {casteOptions.map((caste) => (
                  <option key={caste} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Sub Caste</label>
              <input
                type="text"
                name="subCaste"
                value={formData.subCaste}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Father's Aadhar</label>
              <input
                type="text"
                name="fatherAadhar"
                value={formData.fatherAadhar}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Father's Occupation</label>
              <select
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select Occupation</option>
                {fatherOccupationOptions.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Mother's Aadhar</label>
              <input
                type="text"
                name="motherAadhar"
                value={formData.motherAadhar}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Mother's Occupation</label>
              <select
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select Occupation</option>
                {motherOccupationOptions.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">WhatsApp No</label>
              <input
                type="text"
                name="whatsappNo"
                value={formData.whatsappNo}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Door No</label>
              <input
                type="text"
                name="address.doorNo"
                value={formData.address.doorNo}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={formData.transport}
                  onChange={handleTransportChange}
                  className="mr-2"
                />
                Need Transport
              </label>
            </div>
            {formData.transport && (
              <>
                <div>
                  <label className="block mb-1">Town</label>
                  <select
                    name="transportDetails.town"
                    value={formData.transportDetails.town}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    <option value="">Select Town</option>
                    {towns.map((town) => (
                      <option key={town._id} value={town.name}>
                        {town.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Bus</label>
                  <select
                    name="transportDetails.bus"
                    value={formData.transportDetails.bus}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    <option value="">Select Bus</option>
                    {buses.map((bus) => (
                      <option key={bus._id} value={bus.name}>
                        {bus.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Pickup Point</label>
                  <select
                    name="transportDetails.pickupPoint"
                    value={formData.transportDetails.pickupPoint}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    <option value="">Select Pickup Point</option>
                    {pickupPoints.map((point) => (
                      <option key={point._id} value={point.name}>
                        {point.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="col-span-2">
              <button
                type="submit"
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudents;
