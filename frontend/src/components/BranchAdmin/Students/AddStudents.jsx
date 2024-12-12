import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Allapi from "../../../common";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { mycon } from "../../../store/Mycontext";
import { MdDelete } from "react-icons/md";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
import { useReactToPrint } from "react-to-print";

const AddStudents = () => {
  const tableRef = useRef();
  const { branchdet } = useContext(mycon);
  const [hosteladd, sethosteladd] = useState(false);
  const [photoPreview, setphotoPreview] = useState("");
  const [formData, setFormData] = useState({
    idNo: "",
    admissionNo: "",
    surname: "",
    name: "",
    gender: "",
    class: { name: "", id: "" },
    section: { name: "", id: "" },
    dob: "",
    admissionDate: "",
    photo: "",
    academic_id: "",
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
      amount: 0,
    },
    hostel: false,
    hostelDetails: {
      hostelFee: "",
      terms: "",
    },
    feeDetails: [],
  });

  const [towns, setTowns] = useState([]);
  const [buses, setBuses] = useState([]);
  const [halts, setHalts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classname, setClassname] = useState(null);
  const [curr_town, setcurr_town] = useState(null);

  const Fees = [];
  const { acid } = useParams();
  const casteOptions = ["OC", "BC", "SC", "ST"];
  const fatherOccupationOptions = ["Employee", "Business"];
  const motherOccupationOptions = ["Housewife", "Employee"];

  const curracad = async (bid) => {
    const response = await fetch(Allapi.getAcademicYears.url(bid), {
      method: Allapi.getAcademicYears.method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch academic years");
    }

    const res = await response.json();
    if (res.success) {
      const years = res.data;
      const present_Acad = years.find((year) => year._id == acid);
      const yearSuffix = present_Acad.year.slice(-2);
      console.log("present academic is", yearSuffix);
      const studentCountResponse = await fetch(
        Allapi.getStudentCountByAcademicYear.url(acid),
        {
          method: Allapi.getStudentCountByAcademicYear.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!studentCountResponse.ok) {
        throw new Error("Failed to fetch student count for the academic year");
      }

      const studentCountData = await studentCountResponse.json();
      if (studentCountData.success) {
        const currentCount = studentCountData.count + 1; // Increment for the new student
        const id = `${yearSuffix}${String(currentCount).padStart(4, "0")}`;

        // Update the form data
        setFormData((prev) => ({
          ...prev,
          idNo: id,
          academic_id: acid,
        }));
      } else {
        throw new Error("Failed to retrieve student count data");
      }
    }
  };

  useEffect(() => {
    if (branchdet && branchdet._id && acid) {
      curracad(branchdet._id);
    }

    const fetchClasses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(Allapi.getClasses.url(acid), {
          method: Allapi.getClasses.method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.success) {
          setClasses(result.data);
          console.log("classes are", classes);
        } else {
          toast.error(result.message || "Failed to fetch classes");
        }
      } catch (error) {
        toast.error("Error fetching classes");
      }
    };

    if (acid) fetchClasses();
  }, [branchdet]);

  useEffect(() => {
    const fetchSections = async (className, curr_acad) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          Allapi.getSectionsByClass.url(className, curr_acad),
          {
            method: Allapi.getSectionsByClass.method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          setSections(result.data || []);
        } else {
          toast.error(result.message || "Failed to fetch sections");
        }
      } catch (error) {
        toast.error("Error fetching sections");
      }
    };
    if (classname != null && acid) {
      console.log("classname is", classname);
      console.log("acid is", acid);
      fetchSections(classname, acid);
    }
  }, [branchdet, classname, acid]);
  // useEffect(() => {
  //   if (curr_town) {
  //     console.log("fetching buses...");
  //     console.log("current town is", curr_town);
  //     fetchbusdetails(curr_town);

  //     const selectedtown = towns.find((town) => town.townName === curr_town);
  //     console.log("selectes town in useEffect", selectedtown);
  //     if (selectedtown) {
  //       setHalts(selectedtown.halts);
  //       console.log("halts isss", selectedtown.halts);
  //     }
  //     console.log("form data is", formData);
  //     console.log("townname is", curr_town);
  //     console.log("halts are useEffect", halts);
  //   }
  // }, [curr_town]);
  useEffect(() => {
    if (curr_town) {
      console.log("Fetching buses for town:", curr_town);
      fetchbusdetails(curr_town);
    }
  }, [curr_town]);

  // Set halts when both towns and curr_town are available
  useEffect(() => {
    if (curr_town && towns.length > 0) {
      const selectedtown = towns.find((town) => town.townName === curr_town);
      console.log("Selected town:", selectedtown);

      if (selectedtown) {
        setHalts(selectedtown.halts);
        console.log("Halts updated to:", selectedtown.halts);
        setFormData((prev) => ({
          ...prev,
          transportDetails: {
            ...prev.transportDetails,
            amount: selectedtown.amount,
          },
        }));
        console.log("changeform data is", formData);
      }
    }
  }, [curr_town, towns]);

  const fetchTransportDetails = async () => {
    console.log("fecthing towns");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(Allapi.getallTowns.url(acid), {
        method: Allapi.getallTowns.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const townsData = await response.json();
      setTowns(townsData.data);
      console.log("town data is", townsData);
    } catch (error) {
      toast.error("Error fetching transport details");
    }
  };
  const fetchbusdetails = async (townname) => {
    const token = localStorage.getItem("token");
    try {
      console.log("current town to fetch busses is", townname);
      const bus_response = await fetch(Allapi.getByPlaceBus.url(acid), {
        method: Allapi.getByPlaceBus.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ place: townname }),
      });

      const busesData = await bus_response.json();
      setBuses(busesData.data);
      console.log(busesData);
    } catch (error) {
      console.log("bus error is", error.message);
      toast.error(error);
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
    } else {
      formData.feeDetails.forEach((fee, index) => {
        if (fee.name === "Transport-fee") {
          formData.feeDetails.splice(index, 1);
          formData.transportDetails.amount = 0;
          formData.transportDetails.town = "";
        }
      });
    }
  };

  const handleClassChange = (e) => {
    const selectedClass = classes.find((cls) => cls.name === e.target.value);

    console.log("selected class is ", selectedClass);
    // console.log("selected class name", selectedClass.name);
    setFormData((prev) => ({
      ...prev,
      class: { name: selectedClass.name, id: selectedClass._id }, // Set both class name and id
      section: "", // Reset section if class changes
      feeDetails: [],
    }));
    console.log("form data in classchange is", formData);
    setClassname(selectedClass.name);
    console.log("classname current is", classname);
  };

  const handleSectionChange = async (e) => {
    const selectedSection = sections.find((sec) => sec.name === e.target.value);
    console.log("selected section is", selectedSection);
    setFormData((prev) => ({
      ...prev,
      section: { name: selectedSection.name, id: selectedSection._id },
    }));

    // {selectedSection.fees && selectedSection.fees.map((fee,index)=>{
    //   setfees((prev)=>({
    //     ...prev,

    //   }))
    // })}
    if (selectedSection.fees) {
      console.log("current sec fees are", selectedSection.fees);
      selectedSection.fees.map((fees) => {
        formData.feeDetails.push({
          name: fees.feeType,
          amount: fees.amount,
        });
        console.log("formadata is", formData);
        Fees.push({
          name: fees.feeType,
          amount: fees.amount,
        });
      });
    }
    console.log(" curr fees are ", Fees);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("image data is ", data);
      setphotoPreview(data.secure_url);
      setFormData((prev) => ({ ...prev, photo: data.secure_url }));
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error("Photo upload failed");
    }
  };
  const handleHostelChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hostel: e.target.checked,
    }));
    if (!e.target.checked) {
      formData.feeDetails.forEach((fee, index) => {
        if (fee.name === "hostel-fee") {
          formData.feeDetails.splice(index, 1);
          formData.hostelDetails.hostelFee = "";
          formData.hostelDetails.terms = "";
        }
      });
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("name is", name, " value is", value);
    console.log("towns are", towns);

    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value,
        },
      }));

      console.log("form data is address ", formData);
    } else if (name.startsWith("transportDetails.")) {
      console.log("details fee are ", formData.feeDetails);
      const fieldName = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        transportDetails: { ...prev.transportDetails, [fieldName]: value },
      }));
      if (fieldName == "town") {
        setcurr_town(value);
        formData.feeDetails.forEach((fee, index) => {
          if (fee.name === "Transport-fee") {
            formData.feeDetails.splice(index, 1);
          }
        });
      }
      // Fetch transport details only if the town field is updated
      if (towns.length == 0) {
        await fetchTransportDetails();
      }
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
  function addTfee() {
    if (formData.transport == true && formData.transportDetails.amount != 0) {
      const checkTfee = formData.feeDetails.some(
        (fee) => fee.name === "Transport-fee"
      );
      if (!checkTfee) {
        setFormData((prev) => ({
          ...prev,
          feeDetails: [
            ...prev.feeDetails,
            {
              name: "Transport-fee",
              amount: parseInt(formData.transportDetails.amount),
            },
          ],
        }));
      } else {
        toast.error(" transport fee added already");
      }
    }
  }
  function addfee() {
    console.log("current fees are", Fees);

    const checkfee = formData.feeDetails.some(
      (fee) => fee.name === "hostel-fee"
    );
    console.log("checkfee is", checkfee);
    if (!checkfee) {
      setFormData((prev) => ({
        ...prev,
        feeDetails: [
          ...prev.feeDetails,
          {
            name: "hostel-fee",
            amount: parseInt(formData.hostelDetails.hostelFee),
          },
        ],
      }));
      sethosteladd(true);

      console.log("fee form data hostel", formData);
      Fees.push({
        name: "hostel-fee",
        amount: formData.hostelDetails.hostelFee,
      });
      console.log("all fees are", Fees);
    } else {
      toast.error("Hostel Fee added already");
    }
  }
  function imgdel() {
    const del = window.confirm("Do you want to delete this image");
    if (del) {
      setphotoPreview("");
      formData.photo = "";
    }
  }
  const calculateTotalFee = () =>
    formData.feeDetails.reduce(
      (total, fee) => total + (fee.finalAmount || fee.amount),
      0
    );

  // const handlePrint = () => {
  //   // Get the table to print
  //   const printContents = document.querySelector("table").outerHTML;

  //   // Add CSS for table formatting
  //   const style = `
  //     <style>
  //       img {
  //         display: block;
  //         margin: 20px auto;
  //         width: 200px;
  //         height: 214px;
  //         object-fit: cover; /* Ensures proper scaling */
  //       }
  //       table {
  //         width: 100%;
  //         border-collapse: collapse;
  //       }
  //       th, td {
  //         border: 1px solid #ccc;
  //         padding: 8px;
  //         text-align: left;
  //       }
  //       th {
  //         background-color: #f8f8f8;
  //       }
  //       tr:hover {
  //         background-color: #f1f1f1;
  //       }
  //     </style>
  //   `;

  //   // Open a new window for printing
  //   const printWindow = window.open("", "_blank");

  //   // Write contents to the new window
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Vidya Nidhi Institutions</title>
  //         ${style}
  //       </head>
  //       <body>
  //       <div>Name:${formData.name}</div>
  //       <div>Class:${formData.class.name}</div>
  //       <div>Section:${formData.section.name}</div>
  //       <div>Id no:${formData.idNo}</div>
  //       <div>Father Name:${formData.fatherName}</div>
  //       <div>phone number:${formData.whatsappNo}</div>
  //       <img src="${formData.photo}" alt="profile-img"/>

  //         ${printContents}
  //       </body>
  //     </html>
  //   `);

  //   // Print the window content
  //   printWindow.document.close(); // Close document for additional changes
  //   printWindow.focus(); // Ensure focus on the print window
  //   printWindow.print(); // Trigger print dialog
  //   printWindow.close(); // Close the print window after printing
  // };
  const handlePrint = () => {
    // Get the table to print
    const printContents = document.querySelector("table").outerHTML;

    // Add CSS for table formatting
    const style = `
      <style>
        .maintitle {
    font-size: 20px;
    font-weight: bold; 
    text-align: center;
    margin-bottom: 10px; 
}
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f8f8f8;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
      </style>
    `;

    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Write contents to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Vidya Nidhi Institutions</title>
          ${style}
        </head>
        <body>
          <div class="maintitle">FEE RECEIPT</div>
          <div>Name: ${formData.name}</div>
          <div>Class: ${formData.class.name}</div>
          <div>Section: ${formData.section.name}</div>
          <div>ID No: ${formData.idNo}</div>
          <div>Father Name: ${formData.fatherName}</div>
          <div>Phone Number: ${formData.whatsappNo}</div>
          ${printContents}
        </body>
      </html>
    `);

    // Print the window content
    printWindow.document.close(); // Close document for additional changes
    printWindow.focus(); // Ensure focus on the print window
    printWindow.print(); // Trigger print dialog
    printWindow.close(); // Close the print window after printing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata is", formData);

    // Create a deep copy of formData to manipulate before submission
    const submissionData = { ...formData };

    // Remove transportDetails if transport is false
    if (!formData.transport) {
      delete submissionData.transportDetails;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(Allapi.addStudent.url, {
        method: Allapi.addStudent.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        toast.success("Student added successfully!");
        setFormData({
          admissionNo: "",
          surname: "",
          name: "",
          gender: "",
          class: "",
          section: "",
          dob: "",
          admissionDate: "",
          academic_id: "",
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
            amount: 0,
          },
          hostel: false,
          hostelDetails: {
            hostelFee: "",
            terms: "",
          },
          feeDetails: [],
          concession: {},
        });
      } else {
        const errorData = await res.json();
        console.log(errorData);
        toast.error(`Failed to add student: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while adding the student");
    }
  };

  return (
    <div className="bg-gray-100 p-6  text-balck rounded-lg shadow-md max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ID No:</label>
            <input
              type="text"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              disabled
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Surname:</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Class:</label>
            <select
              name="class"
              value={formData.class.name || ""}
              onChange={handleClassChange}
              className="input-field"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Section:</label>
            <select
              name="section"
              value={formData.section.name || ""}
              onChange={handleSectionChange}
              className="input-field"
              required
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec._id} value={sec.name}>
                  {sec.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Admission Date:</label>
            <input
              type="date"
              name="admissionDate"
              value={
                formData.admissionDate || new Date().toISOString().split("T")[0]
              }
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Aadhar No:</label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Student AAPR:</label>
            <input
              type="text"
              name="studentAAPR"
              value={formData.studentAAPR}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Caste:</label>
            <select
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="input-field"
              required
            >
              {casteOptions.map((caste) => (
                <option key={caste} value={caste}>
                  {caste}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Sub-Caste:</label>
            <input
              type="text"
              name="subCaste"
              value={formData.subCaste}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Father Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Father Aadhar:</label>
            <input
              type="text"
              name="fatherAadhar"
              value={formData.fatherAadhar}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Father Occupation:
            </label>
            <select
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              className="input-field"
              required
            >
              {fatherOccupationOptions.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Mother Name:</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mother Aadhar:</label>
            <input
              type="text"
              name="motherAadhar"
              value={formData.motherAadhar}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Mother Occupation:
            </label>
            <select
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              className="input-field"
              required
            >
              {motherOccupationOptions.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Whatsapp No:</label>
            <input
              type="text"
              name="whatsappNo"
              value={formData.whatsappNo}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Emergency Contact:
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address:</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <input
              type="text"
              name="address.doorNo"
              placeholder="Door No"
              value={formData.address.doorNo}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="text"
              name="address.pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Photo:</label>
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="input-field"
            accept="image/*"
            required
          />
        </div>
        {photoPreview ? (
          <>
            <div className="photo-preview mt-4 flex justify-center ">
              <div className="bg-slate-400 p-1 relative">
                <img
                  src={photoPreview}
                  alt="Selected Preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                />
                <div
                  onClick={imgdel}
                  className="absolute top-1 right-1 text-xl text-red-600"
                >
                  <MdDelete />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-show bg-red-200 font-bold text-xl">
              Please Upload Your Photo
            </div>
          </>
        )}

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="transport"
              checked={formData.transport}
              onChange={handleTransportChange}
              className="mr-2"
            />
            Transport Required
          </label>
          {formData.transport && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Town:</label>
                <select
                  name="transportDetails.town"
                  value={formData.transportDetails.town || ""}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Town</option>
                  {towns.map((town) => (
                    <option key={town._id} value={town.townName}>
                      {town.townName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Bus:</label>
                <select
                  name="transportDetails.bus"
                  value={formData.transportDetails.bus || ""}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Bus</option>
                  {buses.map((bus) => (
                    <option key={bus._id} value={bus._id}>
                      {bus.busNo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Halt:</label>
                <select
                  name="transportDetails.halt"
                  value={formData.transportDetails.halt || ""}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Halts</option>
                  {halts.map((halt, index) => (
                    <option key={index} value={halt}>
                      {halt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3">
                <button
                  onClick={addTfee}
                  className="text-white justify-center bg-red-600 mt-2 px-4 py-2 rounded"
                >
                  Add Transport Fee
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.hostel}
              onChange={handleHostelChange}
              className="mr-2"
            />
            Require Hostel?
          </label>
          {formData.hostel && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hostel Fee
                </label>
                <input
                  type="number"
                  name="hostelDetails.hostelFee"
                  value={formData.hostelDetails.hostelFee || ""}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Terms
                </label>
                <input
                  type="text"
                  name="hostelDetails.terms"
                  value={formData.hostelDetails.terms || ""}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={addfee}
                  className="text-white bg-red-600 mt-2 px-4 py-2 rounded"
                >
                  Add Hostel Fee
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto relative" ref={tableRef}>
            <thead className="bg-gray-100 ">
              <tr className="font-bold text-lg">
                <th className="px-6 py-3 text-left text-sm font-bold text-black">
                  Fee Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">
                  Concession (%)
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">
                  Final Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.feeDetails.map((fee, index) => (
                <tr key={index} className="border-t text-left hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {fee.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {fee.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <input
                      type="number"
                      className="w-20 px-2 py-1 border rounded-md"
                      value={fee.concession || ""}
                      min="0"
                      max="100"
                      onChange={(e) => {
                        const concession = parseFloat(e.target.value) || 0;
                        const finalAmount =
                          fee.amount - (fee.amount * concession) / 100;
                        const updatedFees = [...formData.feeDetails];
                        updatedFees[index] = {
                          ...fee,
                          concession,
                          finalAmount,
                        };
                        setFormData({ ...formData, feeDetails: updatedFees });
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {fee.finalAmount ? fee.finalAmount.toFixed(2) : fee.amount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-gray-100">
                <td
                  colSpan="3"
                  className="px-6 py-4 text-sm font-medium text-gray-700 text-right"
                >
                  Total Fee:
                </td>
                <td className="px-6 py-4 text-md font-semibold text-black">
                  {calculateTotalFee().toFixed(2)}
                </td>
              </tr>
            </tfoot>
            <button
              onClick={handlePrint}
              className=" absolute bottom-2 left-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 print:hidden"
            >
              Print
            </button>
          </table>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
