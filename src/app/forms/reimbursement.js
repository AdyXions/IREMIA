import { useState } from "react";

export default function ReimbursementForm() {
  const [formData, setFormData] = useState({
    badgeNumber: "",
    item: "",
    total: "",
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
      sheetName: "Reimbursements",
      badgeNumber: Number(formData.badgeNumber),
      item: formData.item,
      total: Number(formData.total),
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
      item: "",
      total: "",
    });
  };

  return (
    <form
      className="flex flex-col gap-6 p-6 border rounded-2xl shadow-md w-full w-full"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Reimbursement Log</h2>

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
          placeholder="e.g. 123456"
          required
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-sm font-medium">
            Item
          </label>
          <input
            id="item"
            name="item"
            type="text"
            value={formData.item}
            onChange={handleChange}
            placeholder="e.g. Bandage"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="total" className="text-sm font-medium">
            Total Amount
          </label>
          <input
            id="total"
            name="total"
            type="number"
            value={formData.total}
            onChange={handleChange}
            placeholder="e.g. 150"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

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
