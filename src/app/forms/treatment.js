import { useState } from "react";
import Image from "next/image";

export default function TreatmentForm() {
  const [formData, setFormData] = useState({
    badgeNumber: "",
    treatmentType: "",
    patientName: "",
    totalBill: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const now = new Date();
    const parsedData = {
      sheetName: "Patient Logs",
      badgeNumber: Number(formData.badgeNumber),
      patientName: formData.patientName,
      treatmentType: formData.treatmentType,
      totalBill: Number(formData.totalBill),
    };
    
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzJ6R-omum1WGSl0PNGKzrenwmLjgKH7LhGkJorJp3Z0zOW3nj-CVTOXlR0bkxiDrr7/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(parsedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      handleReset();
    } catch (err) {
      alert("Submission error:", err);
    }
  };
  

  const handleReset = () => {
    setFormData({
      badgeNumber: "",
      treatmentType: "",
      patientName: "",
      totalBill: ""
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        Treatment Log
      </div>
      <div className="flex justify-center gap-3 align-middle">
        <input
          name="badgeNumber"
          type="number"
          value={formData.badgeNumber}
          onChange={handleChange}
          placeholder="Badge Number"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="treatmentType"
          type="text"
          value={formData.treatmentType}
          onChange={handleChange}
          placeholder="Type of Treatment"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center gap-3 align-middle">
        <input
          name="patientName"
          type="text"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="totalBill"
          type="number"
          value={formData.totalBill}
          onChange={handleChange}
          placeholder="Total Bill"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="reset"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-red-600 text-white"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-green-600 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
