'use client';

import { useState } from 'react';
import TreatmentForm from './forms/treatment';
import ReimbursementForm from './forms/reimbursement'; // Assume you have this too

export default function Home() {
  const [formType, setFormType] = useState('');

  const renderForm = () => {
    if (formType === 'treatment') return <TreatmentForm />;
    if (formType === 'reimbursement') return <ReimbursementForm />;
    return <div className="text-gray-500">Please select a form type</div>;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="row-start-1">
        <label>Form Selected: </label>
        <select
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2"
        >
          <option value="">Select Form</option>
          <option value="treatment">Treatment Form</option>
          <option value="reimbursement">Reimbursement Form</option>
        </select>
      </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 w-full ">
          {renderForm()}
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
