// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
// import Allapi from "../../../common";

// const FeeReport = () => {
//   const [formData, setFormData] = useState({
//     term: "Term-3",
//     selectDate: "12-12-2024",
//     termFee: "",
//     booksFee: "",
//     idCardFee: "",
//     total: 2000,
//     isFullPaid: "NO",
//     paymentType: "Cash",
//   });
//   const [student, setstudent] = useState(null);
//   const sid = useParams().sid;
//   console.log("id is", sid);

//   const fetchStudentById = async (sid) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(Allapi.getstudentbyId.url(sid), {
//         method: Allapi.getstudentbyId.method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await response.json();

//       if (result.success) {
//         console.log("student details are", result.data);
//         setstudent(result.data);
//       } else {
//         toast.error(result.message || "Failed to fetch student data.");
//       }
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//       toast.error("An error occurred while fetching student data.");
//     } finally {
//       console.log("executed ");
//     }
//   };

//   useEffect(() => {
//     if (sid) {
//       fetchStudentById(sid);
//     }
//   }, [sid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     alert("Fee Paid Successfully!");
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white rounded-t-lg flex justify-between">
//           <h2 className="text-xl font-bold">FEE PAY</h2>
//           <span>Pay Details | Stock</span>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4">
//           {/* Student Info */}
//           <div className="mb-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-700 capitalize text-xl">
//                   <span className="font-bold  ">Name: </span>
//                   {student ? student.name : "student-name"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-700">
//                   <span className="font-bold">Section: </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Term and Date */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-gray-600 mb-1">Select Term</label>
//               <select
//                 name="term"
//                 value={formData.term}
//                 onChange={handleChange}
//                 className="border w-full p-2 rounded"
//               >
//                 <option value="Term-1">Term-1</option>
//                 <option value="Term-2">Term-2</option>
//                 <option value="Term-3">Term-3</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-600 mb-1">Select Date</label>
//               <input
//                 type="date"
//                 name="selectDate"
//                 value={formData.selectDate}
//                 onChange={handleChange}
//                 className="border w-full p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Fee Table */}
//           <table className="w-full text-left mb-4 border-collapse">
//             <thead>
//               <tr>
//                 <th className="border-b py-2">Fee</th>
//                 <th className="border-b py-2">Due</th>
//                 <th className="border-b py-2">Enter</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Term Fee */}
//               <tr>
//                 <td className="py-2">
//                   Term Fee <br />
//                   <small>19500.00</small>
//                 </td>
//                 <td className="py-2">2000.00</td>
//                 <td className="py-2">
//                   <input
//                     type="number"
//                     name="termFee"
//                     value={formData.termFee}
//                     onChange={handleChange}
//                     className="border w-full p-1 rounded"
//                   />
//                 </td>
//               </tr>
//               {/* Books Fee */}
//               <tr>
//                 <td className="py-2">
//                   BOOKS FEE <br />
//                   <small>5000.00</small>
//                 </td>
//                 <td className="py-2">0.00</td>
//                 <td className="py-2">
//                   <input
//                     type="number"
//                     name="booksFee"
//                     value={formData.booksFee}
//                     onChange={handleChange}
//                     className="border w-full p-1 rounded"
//                   />
//                 </td>
//               </tr>
//               {/* ID Card Fee */}
//               <tr>
//                 <td className="py-2">
//                   ID Card Fee <br />
//                   <small>100.00</small>
//                 </td>
//                 <td className="py-2">0.00</td>
//                 <td className="py-2">
//                   <input
//                     type="number"
//                     name="idCardFee"
//                     value={formData.idCardFee}
//                     onChange={handleChange}
//                     className="border w-full p-1 rounded"
//                   />
//                 </td>
//               </tr>
//               {/* Total */}
//               <tr>
//                 <td className="py-2 font-bold">
//                   Total <br />
//                   <small>24600</small>
//                 </td>
//                 <td className="py-2 font-bold">{formData.total}</td>
//                 <td className="py-2">
//                   <input
//                     type="number"
//                     name="total"
//                     value={formData.total}
//                     onChange={handleChange}
//                     className="border w-full p-1 rounded"
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Is Full Paid */}
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1">IS FULL PAID</label>
//             <div className="flex items-center space-x-4">
//               <label>
//                 <input
//                   type="radio"
//                   name="isFullPaid"
//                   value="YES"
//                   checked={formData.isFullPaid === "YES"}
//                   onChange={handleChange}
//                 />
//                 <span className="ml-1">YES</span>
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="isFullPaid"
//                   value="NO"
//                   checked={formData.isFullPaid === "NO"}
//                   onChange={handleChange}
//                 />
//                 <span className="ml-1">NO</span>
//               </label>
//             </div>
//           </div>

//           {/* Payment Type */}
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1">Payment Type</label>
//             <select
//               name="paymentType"
//               value={formData.paymentType}
//               onChange={handleChange}
//               className="border w-full p-2 rounded"
//             >
//               <option value="Cash">Cash</option>
//               <option value="Online">Online</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded text-lg font-bold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeeReport;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Allapi from "../../../common"; // Adjust according to your API utility file

const FeeReport = () => {
  const [student, setStudent] = useState(null);
  const { sid } = useParams();
  const [term, setterm] = useState(null);
  const [studentDataForm, setStudentDataForm] = useState({
    padiFee: [], // Store payment information here
  });

  useEffect(() => {
    if (sid) fetchStudentById(sid);
  }, [sid]);

  const fetchStudentById = async (sid) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Allapi.getstudentbyId.url(sid), {
        method: Allapi.getstudentbyId.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        // Initialize padiFee with empty data or payment data if applicable
        const initialPaidFee = result.data.feeDetails.map((fee) => {
          const finalAmount = fee.concession ? fee.finalAmount : fee.amount;
          const terms = Array.from({ length: fee.terms }, (_, termIndex) => {
            const termName = `Term-${termIndex + 1}`;
            return {
              [termName]: [
                {
                  amountPaid: 0, // Initially, no amount paid
                  dueAmount: finalAmount / fee.terms, // Due amount for each term
                  date: new Date().toISOString(), // Today's date
                },
              ],
            };
          });

          return {
            name: fee.name,
            finalAmount: finalAmount, // Final amount after concession
            terms, // Terms with amountPaid, dueAmount, and date
          };
        });

        setStudentDataForm((prev) => ({
          ...prev,
          padiFee: initialPaidFee, // Store the payment information in padiFee
        }));

        setStudent(result.data); // Update student data
      } else {
        toast.error(result.message || "Failed to fetch student data.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("An error occurred while fetching student data.");
    }
  };
  useEffect(() => {
    console.log("rk", studentDataForm);
  }, [studentDataForm]);

  const handlePaymentChange = (feeName, term, value) => {
    setStudentDataForm((prev) => {
      if (!prev.padiFee || prev.padiFee.length === 0) {
        console.error("padiFee is not initialized yet.");
        return prev; // Do nothing if padiFee is empty
      }
      // Find the fee entry in paidFee by its name
      const feeEntry = prev.padiFee.find((fee) => fee.name === feeName);
      console.log("feename", feeEntry);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details Submitted:", studentDataForm);
    toast.success("Fee Paid Successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-5 text-white rounded-t-lg flex justify-between">
          <h2 className="text-2xl font-bold">Fee Payment</h2>
          <span>Student Details & Fees</span>
        </div>

        {/* Student Details */}
        {student && (
          <div className="p-5 border-b">
            <h3 className="text-xl font-bold mb-3 text-gray-700">
              Student Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
              <p>
                <span className="font-semibold">ID:</span> {student.idNo}
              </p>
              <p>
                <span className="font-semibold">Name:</span> {student.name}
              </p>
              <p>
                <span className="font-semibold">Class:</span>{" "}
                {student.id ? student.id.name : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Section:</span>{" "}
                {student.section ? student.section.name : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Admission No:</span>{" "}
                {student.admissionNo}
              </p>
              <p>
                <span className="font-semibold">Aadhar No:</span>{" "}
                {student.aadharNo}
              </p>
            </div>
          </div>
        )}

        {/* Fee Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Fee Details
            </h3>
            <table className="w-full border-collapse border text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Fee Type</th>
                  <th className="p-2 border">Final Amount</th>
                  <th className="p-2 border">Term</th>
                  <th className="p-2 border">Term Amount</th>
                  <th className="p-2 border">Term Due</th>
                  <th className="p-2 border">Total Due</th>
                  <th className="p-2 border">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {student &&
                  student.feeDetails.map((fee) => {
                    const payment =
                      studentDataForm.padiFee.find(
                        (feeItem) => feeItem.name === fee.name
                      ) || {};

                    return (
                      <tr key={fee.name}>
                        <td className="p-2 border">{payment.name}</td>
                        <td className="p-2 border">{payment.finalAmount}</td>

                        <td className="p-2 border">
                          <select
                            className="border p-1 rounded w-full"
                            value={term ? term : ""}
                            onChange={(e) => {
                              const selectedTerm = e.target.value;
                              setterm(selectedTerm);
                              const num =
                                selectedTerm[selectedTerm.length - 1] - 1;
                              console.log("corres term is", num);
                              console.log(
                                "due",
                                payment.terms[num][selectedTerm][
                                  payment.terms[num][selectedTerm].length - 1
                                ].dueAmount
                              );
                              console.log("term", selectedTerm == "Term-2");
                              payment.dueAmount =
                                payment.terms[num][selectedTerm][
                                  payment.terms[num][selectedTerm].length - 1
                                ].dueAmount;
                              payment.totalDue = 0;

                              for (let i = 0; i <= num; i++) {
                                // console.log(
                                //   "res",
                                //   payment.terms[i][selectedTerm][
                                //     payment.terms[i][selectedTerm].length - 1
                                //   ].dueAmount
                                // );
                                console.log("corres term is", num);

                                // console.log(
                                //   "payment ",
                                //   payment.terms[i],
                                //   "num is",
                                //   num
                                // );
                                payment.totalDue +=
                                  payment.terms[i][`Term-${i + 1}`][
                                    payment.terms[i][`Term-${i + 1}`].length - 1
                                  ].dueAmount;
                              }
                            }}
                          >
                            <option value="">Select Term</option>
                            {Array.from(
                              { length: fee.terms },
                              (_, i) => `Term-${i + 1}`
                            ).map((term) => (
                              <option key={term} value={term}>
                                {term}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2 border">
                          {payment.finalAmount / fee.terms}
                        </td>
                        <td className="p-2 border">{payment.dueAmount}</td>
                        <td className="p-2 border">{payment.totalDue}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            className="border p-1 rounded w-full"
                            placeholder="Enter Payment"
                            max={payment.dueAmount}
                    
                            onChange={(e) => {
                              // payment.terms[num][selectedTerm][
                              //   payment.terms[num][selectedTerm].length - 1
                              // ].amountPaid = e.target.value;
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Payment Type */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Payment Type</label>
            <select
              name="paymentType"
              value={studentDataForm.paymentType}
              onChange={(e) =>
                setStudentDataForm({
                  ...studentDataForm,
                  paymentType: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded text-lg font-semibold"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeeReport;
