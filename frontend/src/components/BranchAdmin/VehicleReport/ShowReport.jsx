import React, { useState, useEffect, useContext } from "react";
import { mycon } from "../../../store/Mycontext";
import Allapi from "../../../common";

const ShowReport = () => {
  const { branchdet } = useContext(mycon);
  const curr_Acad = branchdet?.academicYears?.[0] || "";
  const token = localStorage.getItem("token");

  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState("");
  const [vehicleReport, setVehicleReport] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch buses list when component mounts
  useEffect(() => {
    if (curr_Acad) {
      fetchBuses();
    }
  }, [curr_Acad]);

  // Fetch buses
  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch(Allapi.getAllBuses.url(curr_Acad), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }

      const res = await response.json();
      if (res.success) {
        setBuses(res.data);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch vehicle report data when a bus is selected
  useEffect(() => {
    if (!selectedBus) return;

    const fetchVehicleReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          Allapi.getVehicleStudents.url(selectedBus),
          {
            method: Allapi.getVehicleStudents.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle report");
        }

        const data = await response.json();
        if (data.success) {
          const processedData = processReportData(data.data);
          console.log("processed data", processedData);
          setVehicleReport(processedData);
        }
      } catch (error) {
        console.error("Error fetching vehicle report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleReport();
  }, [selectedBus]);

  // Process the report data to group by sections
  const processReportData = (data) => {
    const sectionGroups = data.reduce((acc, student) => {
      const sectionKey = `${student.class.name}-${student.section.name}`;
      if (!acc[sectionKey]) {
        acc[sectionKey] = {
          sNo: Object.keys(acc).length + 1,
          section: sectionKey,
          studentCount: 0,
          townCount: 0,
          holtCount: 0,
          feeDue: 0,
        };
      }
      acc[sectionKey].studentCount++;

      // Check transport type from halt field
      if (student.transportDetails?.halt) {
        if (student.transportDetails.halt.toLowerCase().includes("town")) {
          acc[sectionKey].townCount++;
        } else {
          acc[sectionKey].holtCount++;
        }
      }

      // Calculate fee due from transport fee details
      const transportFee = student.feeDetails?.find(
        (fee) => fee.name === "Transport-fee"
      );
      if (transportFee) {
        acc[sectionKey].feeDue +=
          transportFee.amount - (transportFee.paid || 0);
      }

      return acc;
    }, {});

    return Object.values(sectionGroups);
  };

  const handleBusChange = (event) => {
    setSelectedBus(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Vehicle Wise Report
      </h1>

      {/* Vehicle Selection Dropdown */}
      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="busSelect"
        >
          Select Vehicle
        </label>
        <select
          id="busSelect"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={selectedBus}
          onChange={handleBusChange}
          disabled={loading}
        >
          <option value="">-- Select a Vehicle --</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.busNo} - {bus.vehicleNo} ({bus.destination})
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Report Table */}
      {!loading && selectedBus && vehicleReport.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Students Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Town
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Halt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-00 uppercase tracking-wider">
                  Fee Due
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicleReport.map((row) => (
                <tr key={row.sNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.sNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.studentCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.townCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.holtCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{row.feeDue.toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-50 font-medium">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicleReport.reduce(
                    (sum, row) => sum + row.studentCount,
                    0
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicleReport.reduce((sum, row) => sum + row.townCount, 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicleReport.reduce((sum, row) => sum + row.holtCount, 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹
                  {vehicleReport
                    .reduce((sum, row) => sum + row.feeDue, 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* No Data State */}
      {!loading && selectedBus && vehicleReport.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No data available for this vehicle</p>
        </div>
      )}
    </div>
  );
};

export default ShowReport;
