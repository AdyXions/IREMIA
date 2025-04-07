import { useState } from "react";

export default function ReimbursementForm() {
  const [formData, setFormData] = useState({
    badgeNumber: "",
    item: "",
    total: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedData = {
      sheetName: "Reimbursements",
      badgeNumber: Number(formData.badgeNumber),
      item: formData.item,
      total: Number(formData.total),
    };
  
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzJ6R-omum1WGSl0PNGKzrenwmLjgKH7LhGkJorJp3Z0zOW3nj-CVTOXlR0bkxiDrr7/exec",
        {
          method: "POST",
          mode:"no-cors",
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
      item: "",
      total: "",
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>Reimbursement Log</div>

      <div className="flex justify-center gap-3 align-middle">
        <input
          name="badgeNumber"
          type="number"
          value={formData.badgeNumber}
          onChange={handleChange}
          placeholder="Badge Number"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      <div className="flex justify-center gap-3 align-middle">
        <input
          name="item"
          type="text"
          value={formData.item}
          onChange={handleChange}
          placeholder="Item"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="total"
          type="number"
          value={formData.total}
          onChange={handleChange}
          placeholder="Total"
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
