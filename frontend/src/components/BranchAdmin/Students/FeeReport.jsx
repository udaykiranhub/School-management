 
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
                            max={payment.totalDue}
                            onChange={(e) => {}}
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
