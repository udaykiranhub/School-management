// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import Allapi from "../../../common";
// import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { mycon } from "../../../store/Mycontext";

// const AddStudents = () => {
//   const { branchdet } = useContext(mycon);
//   const [formData, setFormData] = useState({
//     idNo: "",
//     admissionNo: "",
//     surname: "",
//     name: "",
//     gender: "",
//     class: { name: "", id: "" },
//     section: { name: "", id: "" },
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
//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [classname, setClassname] = useState(null);
//   const [curr_town, setcurr_town] = useState(null);

//   const Fees = [];
//   const { acid } = useParams();
//   const casteOptions = ["OC", "BC", "SC", "ST"];
//   const fatherOccupationOptions = ["Employee", "Business"];
//   const motherOccupationOptions = ["Housewife", "Employee"];

//   const curracad = async (bid) => {
//     const response = await fetch(Allapi.getAcademicYears.url(bid), {
//       method: Allapi.getAcademicYears.method,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch academic years");
//     }

//     const res = await response.json();
//     if (res.success) {
//       const years = res.data;
//       const present_Acad = years.find((year) => year._id == acid);
//       const yearSuffix = present_Acad.year.slice(-2);
//       console.log("present academic is", yearSuffix);
//       const currentCount = 2; //Here we use the number of students in the current academic year
//       const id = `${yearSuffix}${String(currentCount).padStart(4, "0")}`;
//       setFormData((prev) => ({ ...prev, idNo: id }));
//     }
//   };

//   useEffect(() => {
//     if (branchdet && branchdet._id && acid) {
//       curracad(branchdet._id);
//     }

//     const fetchClasses = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch(Allapi.getClasses.url(acid), {
//           method: Allapi.getClasses.method,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         if (result.success) {
//           setClasses(result.data);
//           console.log("classes are", classes);
//         } else {
//           toast.error(result.message || "Failed to fetch classes");
//         }
//       } catch (error) {
//         toast.error("Error fetching classes");
//       }
//     };

//     if (acid) fetchClasses();
//   }, [branchdet]);

//   useEffect(() => {
//     const fetchSections = async (className, curr_acad) => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch(
//           Allapi.getSectionsByClass.url(className, curr_acad),
//           {
//             method: Allapi.getSectionsByClass.method,
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const result = await response.json();
//         if (result.success) {
//           setSections(result.data || []);
//         } else {
//           toast.error(result.message || "Failed to fetch sections");
//         }
//       } catch (error) {
//         toast.error("Error fetching sections");
//       }
//     };
//     if (classname != null && acid) {
//       console.log("classname is", classname);
//       console.log("acid is", acid);
//       fetchSections(classname, acid);
//     }
//   }, [branchdet, classname, acid]);
//   // useEffect(() => {
//   //   if (curr_town) {
//   //     console.log("fetching buses...");
//   //     console.log("current town is", curr_town);
//   //     fetchbusdetails(curr_town);

//   //     const selectedtown = towns.find((town) => town.townName === curr_town);
//   //     console.log("selectes town in useEffect", selectedtown);
//   //     if (selectedtown) {
//   //       setHalts(selectedtown.halts);
//   //       console.log("halts isss", selectedtown.halts);
//   //     }
//   //     console.log("form data is", formData);
//   //     console.log("townname is", curr_town);
//   //     console.log("halts are useEffect", halts);
//   //   }
//   // }, [curr_town]);
//   useEffect(() => {
//     if (curr_town) {
//       console.log("Fetching buses for town:", curr_town);
//       fetchbusdetails(curr_town);
//     }
//   }, [curr_town]);

//   // Set halts when both towns and curr_town are available
//   useEffect(() => {
//     if (curr_town && towns.length > 0) {
//       const selectedtown = towns.find((town) => town.townName === curr_town);
//       console.log("Selected town:", selectedtown);

//       if (selectedtown) {
//         setHalts(selectedtown.halts);
//         console.log("Halts updated to:", selectedtown.halts);
//       }
//     }
//   }, [curr_town, towns]);

//   const fetchTransportDetails = async () => {
//     console.log("fecthing towns");
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(Allapi.getallTowns.url(acid), {
//         method: Allapi.getallTowns.method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const townsData = await response.json();
//       setTowns(townsData.data);
//       console.log("town data is", townsData);
//     } catch (error) {
//       toast.error("Error fetching transport details");
//     }
//   };
//   const fetchbusdetails = async (townname) => {
//     const token = localStorage.getItem("token");
//     try {
//       console.log("current town to fetch busses is", townname);
//       const bus_response = await fetch(Allapi.getByPlaceBus.url(acid), {
//         method: Allapi.getByPlaceBus.method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },

//         body: JSON.stringify({ place: townname }),
//       });

//       const busesData = await bus_response.json();
//       setBuses(busesData.data);
//       console.log(busesData);
//     } catch (error) {
//       console.log("bus error is", error.message);
//       toast.error(error);
//     }
//   };

//   const handleTransportChange = async (e) => {
//     const checked = e.target.checked;
//     setFormData((prev) => ({
//       ...prev,
//       transport: checked,
//     }));
//     if (checked) {
//       await fetchTransportDetails();
//     }
//   };

//   const handleClassChange = (e) => {
//     const selectedClass = classes.find((cls) => cls.name === e.target.value);

//     console.log("selected class is ", selectedClass);
//     // console.log("selected class name", selectedClass.name);
//     setFormData((prev) => ({
//       ...prev,
//       class: { name: selectedClass.name, id: selectedClass._id }, // Set both class name and id
//       section: "", // Reset section if class changes
//     }));
//     console.log("form data in classchange is", formData);
//     setClassname(selectedClass.name);
//     console.log("classname current is", classname);
//   };

//   const handleSectionChange = async (e) => {
//     const selectedSection = sections.find((sec) => sec.name === e.target.value);
//     console.log("selected section is", selectedSection);
//     setFormData((prev) => ({
//       ...prev,
//       section: { name: selectedSection.name, id: selectedSection._id },
//     }));

//     // {selectedSection.fees && selectedSection.fees.map((fee,index)=>{
//     //   setfees((prev)=>({
//     //     ...prev,

//     //   }))
//     // })}
//     if (selectedSection.fees) {
//       selectedSection.fees.map((fees) => {
//         Fees.push({
//           name: fees.feeType,
//           amount: fees.amount,
//         });
//       });
//     }
//     console.log("fees are ", Fees);
//   };

//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_cloudinary_preset");

//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const data = await res.json();
//       setFormData((prev) => ({ ...prev, photo: data.secure_url }));
//       toast.success("Photo uploaded successfully!");
//     } catch (error) {
//       toast.error("Photo upload failed");
//     }
//   };
//   const handleHostelChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       hostel: e.target.checked,
//     }));
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     console.log("name is", name, " value is", value);
//     console.log("towns are", towns);

//     if (name.startsWith("address.")) {
//       const fieldName = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [fieldName]: value,
//         },
//       }));

//       console.log("form data is address ", formData);
//     } else if (name.startsWith("transportDetails.")) {
//       const fieldName = name.split(".")[1];

//       setFormData((prev) => ({
//         ...prev,
//         transportDetails: { ...prev.transportDetails, [fieldName]: value },
//       }));
//       if (fieldName == "town") {
//         setcurr_town(value);
//       }
//       // Fetch transport details only if the town field is updated
//       if (towns.length == 0) {
//         await fetchTransportDetails();
//       }
//     } else if (name.startsWith("hostelDetails.")) {
//       const fieldName = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         hostelDetails: {
//           ...prev.hostelDetails,
//           [fieldName]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };
//   function addfee() {
//     Fees.push({ name: "hostel-fee", amount: formData.hostelDetails.hostelFee });
//     console.log("all fees are", Fees);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("formdata is", formData);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(Allapi.addStudent.url, {
//         method: Allapi.addStudent.method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         toast.success("Student added successfully!");
//         setFormData({
//           idNo: "",
//           admissionNo: "",
//           surname: "",
//           name: "",
//           gender: "",
//           class: "",
//           section: "",
//           dob: "",
//           admissionDate: "",
//           photo: "",
//           aadharNo: "",
//           studentAAPR: "",
//           caste: "",
//           subCaste: "",
//           fatherName: "",
//           fatherAadhar: "",
//           fatherOccupation: "",
//           motherName: "",
//           motherAadhar: "",
//           motherOccupation: "",
//           whatsappNo: "",
//           emergencyContact: "",
//           address: {
//             doorNo: "",
//             street: "",
//             city: "",
//             pincode: "",
//           },
//           transport: false,
//           transportDetails: {
//             town: "",
//             bus: "",
//             halt: "",
//           },
//           hostel: false,
//           hostelDetails: {
//             hostelFee: "",
//             terms: "",
//           },
//           feeDetails: [],
//           concession: {},
//         });
//       } else {
//         const errorData = await res.json();
//         toast.error(`Failed to add student: ${errorData.message}`);
//       }
//     } catch (error) {
//       toast.error("An error occurred while adding the student");
//     }
//   };

//   return (
//     <div className="form-container ">
//       <form onSubmit={handleSubmit} className="flex flex-col">
//         <div>
//           <label>ID No:</label>
//           <input
//             type="text"
//             name="idNo"
//             value={formData.idNo}
//             onChange={handleChange}
//             disabled
//           />
//         </div>
//         <div>
//           <label>Admission No:</label>
//           <input
//             type="text"
//             name="admissionNo"
//             value={formData.admissionNo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Surname:</label>
//           <input
//             type="text"
//             name="surname"
//             value={formData.surname}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Gender:</label>
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
//         <div>
//           <label>Class:</label>

//           <select
//             name="class"
//             value={formData.class.name || ""}
//             onChange={handleClassChange}
//           >
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls.name}>
//                 {cls.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Section:</label>+
//           <select
//             name="Section"
//             value={formData.section.name || ""}
//             onChange={handleSectionChange}
//           >
//             <option value="">Select Section</option>
//             {sections.map((sec) => (
//               <option key={sec._id} value={sec.name}>
//                 {sec.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Admission Date:</label>
//           <input
//             type="date"
//             name="admissionDate"
//             value={formData.admissionDate}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Aadhar No:</label>
//           <input
//             type="text"
//             name="aadharNo"
//             value={formData.aadharNo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Student AAPR:</label>
//           <input
//             type="text"
//             name="studentAAPR"
//             value={formData.studentAAPR}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Caste:</label>
//           <select name="caste" value={formData.caste} onChange={handleChange}>
//             {casteOptions.map((caste) => (
//               <option key={caste} value={caste}>
//                 {caste}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Sub-Caste:</label>
//           <input
//             type="text"
//             name="subCaste"
//             value={formData.subCaste}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Father Name:</label>
//           <input
//             type="text"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Father Aadhar:</label>
//           <input
//             type="text"
//             name="fatherAadhar"
//             value={formData.fatherAadhar}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Father Occupation:</label>
//           <select
//             name="fatherOccupation"
//             value={formData.fatherOccupation}
//             onChange={handleChange}
//           >
//             {fatherOccupationOptions.map((occupation) => (
//               <option key={occupation} value={occupation}>
//                 {occupation}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Mother Name:</label>
//           <input
//             type="text"
//             name="motherName"
//             value={formData.motherName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Mother Aadhar:</label>
//           <input
//             type="text"
//             name="motherAadhar"
//             value={formData.motherAadhar}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Mother Occupation:</label>
//           <select
//             name="motherOccupation"
//             value={formData.motherOccupation}
//             onChange={handleChange}
//           >
//             {motherOccupationOptions.map((occupation) => (
//               <option key={occupation} value={occupation}>
//                 {occupation}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Whatsapp No:</label>
//           <input
//             type="text"
//             name="whatsappNo"
//             value={formData.whatsappNo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Emergency Contact:</label>
//           <input
//             type="text"
//             name="emergencyContact"
//             value={formData.emergencyContact}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address.doorNo"
//             placeholder="Door No"
//             value={formData.address.doorNo}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.street"
//             placeholder="Street"
//             value={formData.address.street}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.city"
//             placeholder="City"
//             value={formData.address.city}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.pincode"
//             placeholder="Pincode"
//             value={formData.address.pincode}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Upload Photo:</label>
//           <input type="file" onChange={handlePhotoUpload} />
//         </div>
//         <div>
//           <label>Transport Required:</label>
//           <input
//             type="checkbox"
//             name="transport"
//             checked={formData.transport}
//             onChange={handleTransportChange}
//           />
//         </div>
//         {formData.transport && (
//           <div>
//             <label>Town:</label>
//             <select
//               name="transportDetails.town"
//               value={formData.transportDetails.town || "SELECT TOWN"}
//               onChange={handleChange}
//             >
//               <option value="">Select Towns</option>

//               {towns.map((town) => (
//                 <option key={town._id} value={town.townName}>
//                   {town.townName}
//                 </option>
//               ))}
//             </select>
//             <label>Bus:</label>
//             <select
//               name="transportDetails.bus"
//               value={formData.transportDetails.bus}
//               onChange={handleChange}
//             >
//               <option value="">Select Buses</option>

//               {buses &&
//                 buses.map((bus) => (
//                   <option key={bus._id} value={bus._id}>
//                     {bus.busNo}
//                   </option>
//                 ))}
//             </select>
//             <label>Halt:</label>
//             <select
//               name="transportDetails.halt"
//               value={formData.transportDetails.halt}
//               onChange={handleChange}
//             >
//               <option value="">Select Halts</option>

//               {halts.map((halt, index) => (
//                 <option key={index} value={halt}>
//                   {halt}
//                 </option>
//               ))}
//             </select>

//             <div>
//               {/* Hostel */}
//               <div className="col-span-2">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.hostel}
//                     onChange={handleHostelChange}
//                     className="mr-2"
//                   />
//                   Require Hostel?
//                 </label>
//                 {formData.hostel && (
//                   <div className="mt-4">
//                     <div>
//                       <label>Hostel Fee</label>
//                       <input
//                         type="number"
//                         name="hostelDetails.hostelFee"
//                         value={formData.hostelDetails.hostelFee}
//                         onChange={handleChange}
//                         className="input-field"
//                       />
//                     </div>
//                     <div>
//                       <label>Number of Terms</label>
//                       <input
//                         type="text"
//                         name="hostelDetails.terms"
//                         value={formData.hostelDetails.terms}
//                         onChange={handleChange}
//                         className="input-field"
//                       />
//                     </div>
//                     <button onClick={addfee} className="text-white  bg-red-600">
//                       Addfee
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudents;
