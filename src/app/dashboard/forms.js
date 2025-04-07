
import { useState } from 'react';

import TreatmentForm from '../forms/treatment';
import ReimbursementForm from '../forms/reimbursement'; // Assume you have this too

export default function Forms() {
    const [formType, setFormType] = useState('');

  const renderForm = () => {
    
    if (formType === 'treatment') return <TreatmentForm />;
    if (formType === 'reimbursement') return <ReimbursementForm />;
    return <div className="text-gray-500">Please select a form type</div>;
  };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <label>Form: </label>
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
            
            <div className="w-full ">
            {renderForm()}
            </div>
        </div>
    )
}