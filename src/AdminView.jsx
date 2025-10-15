// src/AdminView.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function AdminView() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Kuhaon ang data gikan sa atong bag-o nga backend endpoint
    fetch('http://localhost:4000/submissions')
      .then(response => response.json())
      .then(data => setSubmissions(data.reverse())); // .reverse() para mauna ang pinakabag-o
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <Link to="/" className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Form
            </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Date Submitted</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Name</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Address</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Provider</th>
                <th className="py-3 px-4 border-b text-center text-sm font-semibold text-slate-600">Images</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-3 px-4 border-b text-slate-700">{new Date(sub.submittedAt).toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-slate-700">{sub.name}</td>
                  <td className="py-3 px-4 border-b text-slate-700">{sub.address}</td>
                  <td className="py-3 px-4 border-b text-slate-700">{sub.provider}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <a href={`http://localhost:4000/uploads/${sub.photoFile}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline mr-4">Photo</a>
                    <a href={`http://localhost:4000/uploads/${sub.signatureFile}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Signature</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}