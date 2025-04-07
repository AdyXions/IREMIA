import { useState } from "react";

export default function TreatmentForm() {
  const [formData, setFormData] = useState({
    badgeNumber: "",
    treatmentType: "",
    patientName: "",
    totalBill: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedData = {
      sheetName: "Patient Logs",
      badgeNumber: Number(formData.badgeNumber),
      patientName: formData.patientName,
      treatmentType: formData.treatmentType,
      totalBill: Number(formData.totalBill),
    };

    try {
      await fetch(
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
      console.error("Submission error:", err);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setFormData({
      badgeNumber: "",
      treatmentType: "",
      patientName: "",
      totalBill: "",
    });
  };

  return (
    <form
      className="flex flex-col gap-6 p-6 border rounded-2xl shadow-md w-full w-full"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Treatment Log</h2>

      {/* Badge & Treatment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="badgeNumber" className="text-sm font-medium">
            Badge Number
          </label>
          <input
            id="badgeNumber"
            name="badgeNumber"
            type="number"
            value={formData.badgeNumber}
            onChange={handleChange}
            placeholder="e.g. 1023"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="treatmentType" className="text-sm font-medium">
            Treatment Type
          </label>
          <input
            id="treatmentType"
            name="treatmentType"
            type="text"
            value={formData.treatmentType}
            onChange={handleChange}
            placeholder="e.g. Surgery"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Patient & Bill */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="patientName" className="text-sm font-medium">
            Patient Name
          </label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="totalBill" className="text-sm font-medium">
            Total Bill
          </label>
          <input
            id="totalBill"
            name="totalBill"
            type="number"
            value={formData.totalBill}
            onChange={handleChange}
            placeholder="e.g. 1200"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          type="reset"
          onClick={handleReset}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
